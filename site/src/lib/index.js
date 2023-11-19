import { io } from "socket.io-client";
import { writable } from "svelte/store";
const socket = io("http://localhost:3000");

export let
    history = writable(null),
    alert = writable(null),
    error = writable(false),
    areas = writable(null),
    users = writable(0);

socket.on("users", msg => users.set(msg));
socket.on("areas", msg => areas.set(msg));
socket.on("alert", msg => { alert.set(msg); error.set(false); });
socket.on("history", msg => {
    let temp = [...msg];
    temp.forEach((element, i) => {
        if(temp[i+1]?.alertDate === element.alertDate && temp[i + 1]?.title === element.title) {
            element.data += `, ${temp[i + 1].data}`;
            temp.splice(i + 1, 1);
        };
    });

    error.set(false);
    history.set(temp);
});

socket.on("error", () => error.set(true));
socket.io.on("error", () => error.set(true));
socket.io.on("reconnect", () => error.set(false));