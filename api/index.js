import { Server } from "socket.io";
import { createServer } from "node:http";

const server = createServer();
const io = new Server(server, {
	cors: { origin: "https://oref.theannoying.dev" },
	connectionStateRecovery: {}
});

const fetchURLS = {
	"history": "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&fromDate=01.01.2005&toDate=&mode=0",
	"alert": "https://www.oref.org.il/WarningMessages/alert/alerts.json",
	"cities": "https://www.oref.org.il/Shared/Ajax/GetCitiesMix.aspx?lang=he",
	"instructions": "https://www.oref.org.il/Shared/Ajax/GetAlarmInstructions.aspx?lang=he"
}

async function fetchData(type = "alert") {
	if(type.toLowerCase() === "history") {
		let history = [];
		const res = await fetch(fetchURLS[type.toLowerCase()]).then(e => e.json()).catch(() => {});
		if(res) {
			res.forEach((e, i) => {
				let location = e.data.split(", ");

				const existing = history.find(v => v.time.slice(0, 5) === e.time.slice(0, 5) && v.date === e.date && v.type === e["category_desc"]);
				if(existing) return existing.location.push(location);

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
	} else if(type.toLowerCase() === "alert") {
		let alert = {};
		const res = await fetch(fetchURLS[type.toLowerCase()], {
			headers: {
				"x-requested-with": "XMLHttpRequest",
				Referer: "https://www.oref.org.il/12481-he/Pakar.aspx"
			},
		}).then(e => e.text()).then(e => e.trim());

		if (res.length > 0) {
			const raw = JSON.parse(res);
			alert = {
				type: raw.title,
				locations: raw.data,
				description: raw.desc
			}
		}

		return alert;
	} else if(type.toLowerCase() === "cities") {
		let cities = [];
		const res = await fetch(fetchURLS[type.toLowerCase()]).then(e => e.json()).catch(() => {});
		if(res) res.forEach(e => cities.push(e.label));

		return cities;
	} else {
		const res = await fetch(fetchURLS[type.toLowerCase()]).then(e => e.json()).catch(() => { });
		return res;
	}
}

let alertRecently;

function emit(name, value) {
	return new Promise(fulfil => io.emit(name, value, fulfil));
}

async function sendData() {
	try {
		const alert = await fetchData("alert");
		const keyAmount = Object.keys(alert).length;

		if (keyAmount > 0) {
			alertRecently = true;

			await emit("alert", alert);
			await emit("instructions", await fetchData("instructions"));
		} else if (keyAmount === 0 && alertRecently) {
			alertRecently = false;
			await emit("alert", {});
			await emit("history", await fetchData("history"));
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
	socket.emit("history", await fetchData("history"));

	socket.emit("cities", await fetchData("cities"));
	socket.on("disconnect", () => {
		console.log("a user disconnected");
		socket.emit("usercount", io.engine.clientsCount);
	});
});

server.listen(3000, () => {
	console.log("server started");
});