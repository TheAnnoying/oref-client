import { io } from "socket.io-client";
import { log } from "./components/util/log.js";
import { writable } from "svelte/store";

const serverURL = "http://localhost:3000";
const socket = io(serverURL);

export let
    history = writable({}),
    alert = writable({}),
    connected = writable(false),
    districts = writable(null),
    usercount = writable(0);

socket.on("connect", () => log("Connected to WS"));

socket.on("usercount", msg => usercount.set(msg));
socket.on("districts", msg => districts.set(msg));
socket.on("alert", msg => alert.set(msg));
socket.on("history", msg => history.set(msg));

const setConnected = (bool = false) => connected.set(bool);

socket.io.on("reconnect_failed", setConnected);
socket.io.on("connect_error", setConnected);
socket.io.on("error", setConnected);
socket.on("disconnect", setConnected);
socket.on("connect", () => setConnected(true));

socket.io.on("reconnect", () => log("Reconnected to WS"));
socket.io.on("reconnect_attempt", () => {
    log("Attempting a WS reconnect...", "warn");
    setConnected();
});