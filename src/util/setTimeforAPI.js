export default function setTimeforAPI(date, time) {
    let dates = new Date(date + " " + time);

    return (
        dates.toLocaleDateString("fr-CA") +
        "T" +
        dates
            .toLocaleTimeString("en-GB")
            .replace(" AM", "")
            .replace(" PM", "") +
        "Z"
    );
}
