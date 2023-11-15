import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin: "http://localhost:5173" },
	connectionStateRecovery: {}
});

function getHistory() {
	return fetch("https://www.oref.org.il/WarningMessages/History/AlertsHistory.json").then(e => e.json());
}

// fetch("https://www.oref.org.il//Shared/Ajax/GetAlarmInstructions.aspx?lang=he&from=1&cityid=F45AB2C88228D6CBBDF5D1BFD8F14FFA", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "no-cache",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "DisableU1st=1; SilenceWaveAll=0; ListEmergency=[{\"CityCode\":\"1310\",\"AreaCode\":\"8\",\"AlertType\":\"0\"},{\"CityCode\":\"6009\",\"AreaCode\":\"8\",\"AlertType\":\"0\"},{\"CityCode\":\"6008\",\"AreaCode\":\"8\",\"AlertType\":\"0\"}]; UsId=80ZUC18E-DL79-1I4V-DGOC-SROWP2MUFHEN; _fbp=fb.2.1698569206104.857969353; _hjSessionUser_2052890=eyJpZCI6IjBlNmQ5YzkyLWE4ODktNWJjZi05ODFkLTgzOTIzN2MzNjc3YSIsImNyZWF0ZWQiOjE2OTg4Mzk4MTM5OTIsImV4aXN0aW5nIjp0cnVlfQ==; AlertSoundNewFeature=1; _gid=GA1.3.753966245.1699562015; AlertSound=0; Lastalerts=; _clck=1rpgkkx|2|fgl|0|1397; _hjIncludedInSessionSample_2052890=0; _hjSession_2052890=eyJpZCI6IjU2ZWQyNWM5LTJmZjAtNDZhNi05Y2U4LWE5ZTBhOTgyZGFhMiIsImNyZWF0ZWQiOjE2OTk2MTEyMTgyMDcsImluU2FtcGxlIjpmYWxzZSwic2Vzc2lvbml6ZXJCZXRhRW5hYmxlZCI6dHJ1ZX0=; _ga=GA1.3.1386314922.1698569205; _gat_UA-161451162-1=1; _clsk=10zqx6s|1699612047430|4|1|u.clarity.ms/collect; _ga_V2BQHCDHZP=GS1.1.1699611204.13.1.1699612050.46.0.0",
//     "Referer": "https://www.oref.org.il//12481-he/Pakar.aspx",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": null,
//   "method": "GET"
// });

async function getAlert() {
	return (await fetch("https://www.oref.org.il/WarningMessages/alert/alerts.json", {
		headers: {
			"x-requested-with": "XMLHttpRequest",
			Referer: "https://www.oref.org.il/12481-he/Pakar.aspx"
		},
	}).then(e => e.text())).trim();
}

setInterval(async () => {
	io.emit("users", io.sockets.sockets.size-1);

	try {
		const alert = await getAlert();

		if(alert.length > 0) {
			io.emit("history", await getHistory());
			io.emit("alert", JSON.parse(alert));
		}
	} catch(error) {
		io.emit("error", error);
	}
}, 5_000);

io.on("connection", async socket => {
	console.log("a user connected");
	io.emit("history", await getHistory());
	io.emit("areas", await fetch("https://www.oref.org.il//Shared/Ajax/GetDistricts.aspx?lang=he").then(e => e.json()));

	socket.on("disconnect", () => console.log("a user disconnected"));
});

server.listen(3000, () => {
	console.log("server started");
});