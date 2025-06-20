import { io } from "socket.io-client";
import { log, type History, type Alert } from "$lib/utils.ts";
import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export const localStorage = {
    get: (name: string): string | null => {
        if(browser) return window.localStorage.getItem(name);
        return null;
    },
    set: (name: string, value: string): string => {
        if(browser) window.localStorage.setItem(name, value);
        return value;
    }
}

export let
    history: Writable<History[] | unknown> = writable(),
    alert: Writable<Alert | unknown> = writable({}),
    connected = writable(false),
    cities = writable([]),
    usercount = writable(0),
    interactionBeforeBrowserAudioDialogOpen = writable(false),
    preferredLocations = writable(JSON?.parse(localStorage.get("preferredLocations") ?? "[]")),
    alertSound = writable(JSON?.parse(localStorage.get("alertSound") ?? "\"beep\"")),
    muted = writable(JSON?.parse(localStorage.get("muted") ?? "false"));

export function connectWebsocket() {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("usercount", msg => usercount.set(msg));
    socket.on("cities", msg => cities.set(msg));
    socket.on("alert", msg => alert.set(msg));
    socket.on("history", msg => history.set(msg));

    const setConnected = (bool: boolean = false): void => connected.set(bool);

    socket.on("connect", () => {
        log("Connected to WS");

        interactionBeforeBrowserAudioDialogOpen.set(true);
        setConnected(true);
    });

    socket.io.on("reconnect_failed", setConnected);
    socket.io.on("error", setConnected);
    socket.on("disconnect", setConnected);
    socket.on("connect", () => setConnected(true));

    socket.io.on("reconnect", () => log("Reconnected to WS"));
    socket.io.on("reconnect_attempt", () => {
        log("Attempting a WS reconnect...", "warn");
        setConnected();
    });
}