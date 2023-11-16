import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
	connectionStateRecovery: {}
});

function getData(type = "alert") {
	switch(type.toLowerCase()) {
		case "history":
			return fetch("https://www.oref.org.il/WarningMessages/History/AlertsHistory.json").then(e => e.json());
		case "alert":
			return fetch("https://www.oref.org.il/WarningMessages/alert/alerts.json", {
				headers: {
					"x-requested-with": "XMLHttpRequest",
					Referer: "https://www.oref.org.il/12481-he/Pakar.aspx"
				},
			}).then(e => e.text()).trim();
		case "areas":
			return fetch("https://www.oref.org.il/Shared/Ajax/GetDistricts.aspx?lang=he").then(e => e.json());
		case "instructions":
			return fetch("https://www.oref.org.il/Shared/Ajax/GetAlarmInstructions.aspx?lang=he").then(e => e.json());
	}
}

setInterval(async () => {
	io.emit("users", io.sockets.sockets.size-1);

	try {
		const alert = await getData("alert");

		if(alert.length > 0) {
			io.emit("alert", JSON.parse(alert));
			io.emit("history", await getData("history"));
			io.emit("instructions", await getData("instructions"));
		}
	} catch(error) {
		io.emit("error", error);
	}
}, 5_000);

io.on("connection", async socket => {
	console.log("a user connected");

	io.emit("history", await getData("history"));
	io.emit("areas", await getData("areas"));

	socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(3000, () => {
	console.log("server started");
});