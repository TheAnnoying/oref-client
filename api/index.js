import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
	connectionStateRecovery: {}
});

const fetchURLS = {
	"history": "https://www.oref.org.il/WarningMessages/History/AlertsHistory.json",
	"alerts": "https://www.oref.org.il/WarningMessages/alert/alerts.json",
	"districts": "https://www.oref.org.il/Shared/Ajax/GetDistricts.aspx?lang=he",
	"instructions": "https://www.oref.org.il/Shared/Ajax/GetAlarmInstructions.aspx?lang=he"
}

async function fetchData(type = "alert") {
	if (type.toLowerCase() === "history") {
		let history = [];
		const res = await fetch(fetchURLS["history"]).then(e => e.json()).catch(() => { });
		if(res) {
			res.forEach((e, i) => {
				const lastElement = res[i - 1];
				let location = e.data;

				if (e.alertDate === lastElement?.alertDate && e.title === lastElement?.title) location += `, ${lastElement.data}`;
				history.push({
					date: e.alertDate,
					type: e.title,
					location
				});
			});
		}

		return history;
	} else if (type.toLowerCase() === "alert") {
		let alert = {};
		const res = await fetch("https://www.oref.org.il/WarningMessages/alert/alerts.json", {
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

async function sendData() {
	io.emit("usercount", io.sockets.sockets.size - 1);
	try {
		const alert = await fetchData("alert");
		const keyAmount = Object.keys(alert).length;

		if (keyAmount > 0) {
			alertRecently = true;

			io.emit("alert", alert);
			io.emit("history", await getData("history"));
			io.emit("instructions", await getData("instructions"));
		} else if (keyAmount === 0 && alertRecently) {
			alertRecently = false;
			io.emit("alert", {});
		}
	} catch (error) {
		console.error(error);
	}

	setTimeout(sendData, 2_000);
}

sendData();

io.on("connection", async socket => {
	console.log("a user connected");

	socket.emit("history", await fetchData("history"));
	socket.emit("districts", await fetchData("districts"));

	socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(3000, () => {
	console.log("server started");
});