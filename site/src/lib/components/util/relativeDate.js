export function relativeDate(date, time, fullDate = false) {
	const [ hours, minutes ] = time.split(":");
	const [ day, month, year ] = date.split(".");
	
	if(fullDate) return `${day}/${month}/${year} - ${hours}:${minutes}`;
	
	let now = new Date();
	let inputDate = new Date(year, month - 1, day, hours, minutes);
	let diffInDays = Math.round((now - inputDate) / (1000 * 60 * 60 * 24));

	if(diffInDays === 0) return `${hours}:${minutes}`;
	else if(diffInDays === 1) return `אתמול ב-${hours}:${minutes}`;
	else return `${day}.${month}.${year}`;
}