/*Валидация даты рождения*/
import { InfoPopUp } from "./InfoPopUp";
function ValidateBirthday(e) {
    let form = e.target.parentNode;
    let happyB = e.target;
    if (happyB.value == "") {
        form.classList.remove("red_border");
    }
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (2 < e.target.value.length && e.target.value.length < 5) {
        e.target.value =
            e.target.value.slice(0, 2) + "." + e.target.value.slice(2, 4);
    } else if (e.target.value.length > 4) {
        e.target.value =
            e.target.value.slice(0, 2) +
            "." +
            e.target.value.slice(2, 4) +
            "." +
            e.target.value.slice(4, 8);
        if (e.target.value.length == 10) {
            let newDate = new Date(
                e.target.value.slice(6, 10),
                Number(e.target.value.slice(3, 5) - 1),
                e.target.value.slice(0, 2)
            );
            let inputDate = newDate.toLocaleDateString("ru-RU");
            let dateNow = new Date();
            let now = dateNow.toLocaleDateString("ru-RU");
            const date1 = new Date(now.split(".").reverse().join("-"));
            const date2 = new Date(inputDate.split(".").reverse().join("-"));
            const delta_days = Math.abs(
                date2.getFullYear() - date1.getFullYear()
            );

            if (delta_days > 100 || delta_days < 14) {
                form.classList.add("red_border");
                InfoPopUp("Некоректная дата", "popup__Info_red");
            } else {
                form.classList.remove("red_border");
            }
        }
    }
}
export { ValidateBirthday };
