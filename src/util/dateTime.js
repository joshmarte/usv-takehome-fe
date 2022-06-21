export default function dateTime(timeString) {
    if (timeString) {
        let timeString12hr = new Date();
        let [hours, minutes] = timeString.split(":");

        timeString12hr.setHours(+hours + 1);
        timeString12hr.setMinutes(minutes);

        return timeString12hr.toLocaleTimeString("en-US", {
            timeZone: "EST",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
        });
    }
}
