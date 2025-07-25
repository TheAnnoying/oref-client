import { Server } from "socket.io";
import { createServer } from "node:http";

const server = createServer();
const io = new Server(server, {
	cors: { origin: /(|.+)theannoying.dev/, },
	connectionStateRecovery: {}
});

const fetchURLS = [ "https://alerts-history.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&fromDate=01.01.2005&toDate=&mode=0", "https://www.oref.org.il/WarningMessages/alert/alerts.json", "https://alerts-history.oref.org.il/Shared/Ajax/GetCitiesMix.aspx?lang=he" ];
const enum DataType { History, Alert, Cities };

type RawHistoryAlert = {
    data: string;          // Location Name
    date: string;          // DD.MM.YYYY
    time: string;          // HH:MM:SS
    alertDate: string;     // ISO 8601 Timestamp
    category: number;      // Alert Type
    category_desc: string; // Alert Type Name
    matrix_id: number;
    rid: number;
};

type HistoryAlert = {
    id: number;
    date: string;
    time: string;
    type: string;
    location: string[];
};

type RawLiveAlert = {
    title?: string;
    data?: string[];
    desc?: string;
}

type LiveAlert = {
    type?: string;
    locations?: string[];
    description?: string;
}

type RawCity = {
    label: string;
    value: string;
    id: string;
    areaid: number;
    color: string;
    migun_time: number;
    mixname: string;
    rashut: string;
    label_he: string;
}

async function fetchData(type: DataType = DataType.Alert) {
    switch(type) {
        case DataType.History: {
            let history: HistoryAlert[] = [];
            let res: RawHistoryAlert[] = await fetch(fetchURLS[type]).then(e => e.json()).catch(() => {});
            if(res) {
                res.forEach(e => {
                    let location = e.data.split(", ");

                    const existing = history.find(v => v.time.slice(0, 5) === e.time.slice(0, 5) && v.date === e.date && v.type === e["category_desc"]);
                    if(existing) return existing.location.push(...location);

                    history.push({
                        id: e.rid,
                        date: e.date,
                        time: e.time,
                        type: e["category_desc"],
                        location
                    });
                });
            }

		    return history;
        }
        case DataType.Alert: {
            let alert: LiveAlert = {};
            let textRes = await fetch(fetchURLS[type], {
                headers: {
                    "x-requested-with": "XMLHttpRequest",
                    Referer: "https://www.oref.org.il/12481-he/Pakar.aspx"
                },
            }).then(e => e.text()).then(e => e.trim());

            if (textRes.length > 0) {
                let raw: RawLiveAlert = {};

                try {
                    raw = JSON.parse(textRes);
                } catch(error) {
                    console.error(error);
                }

                alert = {
                    type: raw?.title,
                    locations: raw?.data,
                    description: raw?.desc
                }
            }

            return alert;
        }
        case DataType.Cities: {
            let cities: string[] = [];
            let res: RawCity[] = await fetch(fetchURLS[type]).then(e => e.json()).catch(() => {});

            if(res) res.forEach(e => cities.push(e.label));
            return cities;
        }
    }
}

let alertRecently: boolean;

function emit(name: string, value: any) {
	return new Promise(fulfil => io.emit(name, value, fulfil));
}

async function sendData() {
	try {
		const alert = await fetchData(DataType.Alert);
		const isThereAlert = Object.values(alert).length > 0 && Object.values(alert).every(e => e?.length > 0);

		if (isThereAlert) {
			alertRecently = true;

			await emit("alert", alert);
		} else if (!isThereAlert && alertRecently) {
			alertRecently = false;

			await emit("alert", {});
			await emit("history", await fetchData(DataType.History));
		}
	} catch (error) {
		console.error(error);
	}

	setTimeout(sendData, 2_000);
}

sendData();

io.on("connection", async socket => {
	console.log("a user connected");

	socket.emit("usercount", io.engine.clientsCount);
	socket.emit("history", await fetchData(DataType.History));

	socket.emit("cities", await fetchData(DataType.Cities));
	socket.on("disconnect", () => {
		console.log("a user disconnected");
		socket.emit("usercount", io.engine.clientsCount);
	});
});

server.listen(3000, () => {
	console.log("server started");
});