export default function dateTime(timeString) {
    let timeString12hr = new Date(
        "2022-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
    });
    return timeString12hr;
}
