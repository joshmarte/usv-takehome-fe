import militaryTime from "./military";
/**
 * handles returing the difference in value between two objects
 * @param {object} obj1 - object one
 * @param {object} obj2 - object two

 */
export default function difference(obj1, obj2) {
    let answer = {};
    let keyFound = [];
    Object.keys(obj1).forEach((key) => {
        if (key === "openingTime" || key === "closingTime") {
            if (obj1[key] !== militaryTime(obj2[key])) {
                return keyFound.push(key);
            }
        } else {
            if (obj1[key] !== obj2[key]) {
                return keyFound.push(key);
            }
        }
    });

    if (keyFound.length > 0) {
        for (let item of keyFound) {
            if (item === "openingTime" || item === "closingTime") {
                answer[item] = militaryTime(obj2[item]);
            } else {
                answer[item] = obj2[item];
            }
        }
    }
    return answer;
}
