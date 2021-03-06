/**
 *
 * @param {string} start - start time
 * @param {string} stop - stop time
 * @param {boolean} restriction - handles wether or not to bound interval to current time or not
 * @returns
 */
export default function interval(start, stop, restriction) {
    if (start && stop) {
        let timeInterval = [];
        let today = new Date();
        today.setHours(today.getHours() + 1);

        // creating time object
        let open = new Date();
        let [hours, minutes] = start.split(":");

        open.setHours(+hours + 1);
        open.setMinutes(minutes);

        let close = new Date();
        [hours, minutes] = stop.split(":");
        close.setHours(+hours + 1);
        close.setMinutes(minutes);

        // increment size
        let step = 30;

        while (open < close) {
            open.setMinutes(open.getMinutes() + step);
            if (restriction) {
                if (today < close && today < open) {
                    let value = open.toLocaleTimeString("en-US", {
                        timeZone: "EST",
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                    });
                    timeInterval.push(value);
                }
            } else {
                let value = open.toLocaleTimeString("en-US", {
                    timeZone: "EST",
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                });
                timeInterval.push(value);
            }
        }

        return timeInterval;
    }
}
