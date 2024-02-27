import { io } from "socket.io-client";
import { log } from "./components/util/log.js";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const localStorage = {
    get: (name) => {
        if(browser) return window.localStorage.getItem(name);
    },
    set: (name, value) => {
        if(browser) window.localStorage.setItem(name, value);
        return value;
    }
}

export let
    history = writable(),
    alert = writable({}),
    connected = writable(false),
    cities = writable([]),
    usercount = writable(0),
    preferredLocations = writable(JSON?.parse(localStorage.get("preferredLocations") ?? "[]")),
    editMode = writable(JSON?.parse(localStorage.get("editMode") ?? false));

export function connectWebsocket() {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("usercount", msg => usercount.set(msg));
    socket.on("cities", msg => cities.set(msg));
    socket.on("alert", msg => alert.set(msg));
    socket.on("history", msg => history.set(msg));

    const setConnected = (bool = false) => connected.set(bool);

    socket.on("connect", () => {
        log("Connected to WS");
        setConnected(true);
    });

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
}