export function relativeDate(dateStr) {
    const [ date, time ] = dateStr.split(" ");
    const [ hours, minutes ] = time.split(":");
    const [ year, month, day ] = date.split("-");

    let now = new Date();
    let inputDate = new Date(year, month - 1, day, hours, minutes);

    let diffInDays = Math.floor((now - inputDate) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
        return `${hours}:${minutes}`;
    } else if (diffInDays === 1) {
        return `אתמול ב-${hours}:${minutes}`;
    } else {
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
}