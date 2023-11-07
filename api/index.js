import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
	connectionStateRecovery: {}
});

async function getHistory() {
	return await fetch("https://www.oref.org.il/WarningMessages/History/AlertsHistory.json").then(e => e.json());
}

async function getAlert() {
	return (await fetch("https://www.oref.org.il/WarningMessages/alert/alerts.json", {
		headers: {
			"x-requested-with": "XMLHttpRequest",
			Referer: "https://www.oref.org.il/12481-he/Pakar.aspx"
		},
	}).then(e => (e.text()))).trim();
}

setInterval(async () => {
	io.emit("users", io.sockets.sockets.size-1);

	const alert = await getAlert();

	if(alert.length > 0) {
		io.emit("history", await getHistory());
		io.emit("alert", JSON.parse(alert));
	}
}, 5_000);

io.on("connection", async socket => {
	console.log("a user connected");
	io.emit("history", await getHistory());

	socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(3000, () => {
	console.log("server started");
});