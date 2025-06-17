import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { Rocket, PlaneTakeoff, Sword, Home, Radiation, Waves, AlertOctagon, ShieldAlert } from "lucide-svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sounds = [
	{ id: "beep", name: "ביפ (ברירת מחדל)", path: "alarms/beep.mp3" },
	{ id: "realistic", name: "מציאותי (מאתר פיקוד העורף)", path: "alarms/realistic.mp4" }
]

export const routes = {
	"/": "עמוד בית",
	"/settings": "הגדרות",
	"/alert/[id]": "התרעות",
	"/map": "מפה",
	"/404": "לא נמצא"
}

export const floatingNavbar = {
	"/": false,
	"/settings": false,
	"/alert/[id]": false,
	"/map": true,
	"/404": false
}

export const alertIcons = {
	"ירי רקטות וטילים": Rocket,
	"חדירת כלי טיס עוין": PlaneTakeoff,
	"חדירת מחבלים": Sword,
	"רעידת אדמה": Home,
	"אירוע רדיולוגי": Radiation,
	"צונאמי": Waves,
	"אירוע חומרים מסוכנים": AlertOctagon,
	"עדכון": ShieldAlert
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
