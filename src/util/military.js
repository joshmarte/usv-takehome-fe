/**
 * handles converting between standard and military time
 * @param {string} stringTime - string for time
 */
export default function militaryTime(stringTime) {
    let date = new Date(`June 24, 2022 ${stringTime}`);
    let options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    };
    let timeString = date.toLocaleString("en-GB", options);
    return timeString;
}
