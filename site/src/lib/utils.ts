import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Rocket, PlaneTakeoff, Sword, Home, Radiation, Waves, AlertOctagon, ShieldAlert, ShieldCheck } from "@lucide/svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function limit(string: string, l: number = 128): string {
  if (string.length <= l) return string;
  return string.slice(0, l - 1).trim() + "…"
}

type Sound = {
	id: string,
	name: string,
	path: string
}

export type History = {
	date: string,
	id: number,
	location: string[],
	time: string,
	type: string
}

export type Alert = {
	type: string,
	locations: string[],
	description: string
};

export const sounds: Sound[] = [
	{ id: "beep", name: "ביפ (ברירת מחדל)", path: "alarms/beep.mp3" },
	{ id: "realistic", name: "מציאותי (מאתר פיקוד העורף)", path: "alarms/realistic.mp4" },
	{ id: "bell", name: "פעמון", path: "alarms/bell.mp3" }
]

export const alertIcons = {
	"ירי רקטות וטילים": Rocket,
	"חדירת כלי טיס עוין": PlaneTakeoff,
	"חדירת מחבלים": Sword,
	"רעידת אדמה": Home,
	"אירוע רדיולוגי": Radiation,
	"צונאמי": Waves,
	"אירוע חומרים מסוכנים": AlertOctagon,
	"עדכון": ShieldAlert,
	"ירי רקטות וטילים -  האירוע הסתיים": ShieldCheck,
	"חדירת כלי טיס עוין - האירוע הסתיים": ShieldCheck
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};

export function log(text: string, type = "log"): void {
    switch(type.toLowerCase()){
        case "log":
            console.log("%cINFO", `
                background: #4CAF50;
                color: #111;
                padding: 0 5px;
                border-radius: 10px
            `, text);
            break;
        case "warn":
            console.warn("%cWARN", `
                background: #af9a4c;
                color: #111;
                padding: 0 5px;
                border-radius: 10px;
            `, text);
            break;
        case "error":
            console.error("%cERROR", `
                background: #af4c4c;
                color: #111;
                padding: 0 5px;
                border-radius: 10px
            `, text);
            break;
    }
}

export function relativeDate(date: string, time: string, fullDate = false): string {
	const [ hours, minutes ] = time.split(":").map(Number);
	const [ day, month, year ] = date.split(".").map(Number);
	
	if(fullDate) return `${day}/${month}/${year} - ${hours}:${minutes}`;
	
	let now = new Date();
	let inputDate = new Date(year, month - 1, day, hours, minutes);
	let diffInDays = Math.round((now.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24));

	if(diffInDays < 1) return `${hours}:${minutes}`;
	else if(diffInDays < 2) return `אתמול ב-${hours}:${minutes}`;
	else return `${day}.${month}.${year}`;
}