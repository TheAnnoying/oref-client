import { Server } from "socket.io";
import { createServer } from "node:http";

const server = createServer();
const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
	connectionStateRecovery: {}
});

const fetchURLS = {
	"history_day": "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=1",
	"history_week": "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=2",
	"history_month": "https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=3",
	"alert": "https://www.oref.org.il/WarningMessages/alert/alerts.json",
	"districts": "https://www.oref.org.il/Shared/Ajax/GetDistricts.aspx?lang=he",
	"instructions": "https://www.oref.org.il/Shared/Ajax/GetAlarmInstructions.aspx?lang=he"
}

async function fetchData(type = "alert") {
	if (["history_day", "history_week", "history_month"].includes(type.toLowerCase())) {
		let history = [];
		const res = await fetch(fetchURLS[type.toLowerCase()]).then(e => e.json()).catch(() => {});
		if(res) {
			res.forEach((e, i) => {
				const lastElement = res[i - 1];
				let location = e.data;

				if (e.alertDate === lastElement?.alertDate && e.title === lastElement?.title) location += `, ${lastElement.data}`;
				history.push({
					date: e.date,
					time: e.time,
					type: e["category_desc"],
					location
				});
			});
		}

		return history;
	} else if (type.toLowerCase() === "alert") {
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
		await emit("usercount", io.sockets.sockets.size - 1);

		const alert = await fetchData("alert");
		const keyAmount = Object.keys(alert).length;

		if (keyAmount > 0) {
			alertRecently = true;

			await emit("alert", alert);
			await emit("instructions", await fetchData("instructions"));

			await emit("history", {
				day: await fetchData("history_day"),
				week: await fetchData("history_week"),
				month: await fetchData("history_month")
			});
		} else if (keyAmount === 0 && alertRecently) {
			alertRecently = false;
			await emit("alert", {});
		}
	} catch (error) {
		console.error(error);
	}

	setTimeout(sendData, 2_000);
}

sendData();

io.on("connection", async socket => {
	console.log("a user connected");

	socket.emit("history", {
		day: await fetchData("history_day"),
		week: await fetchData("history_week"),
		month: await fetchData("history_month")
	});

	socket.emit("districts", await fetchData("districts"));
	socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(3000, () => {
	console.log("server started");
});