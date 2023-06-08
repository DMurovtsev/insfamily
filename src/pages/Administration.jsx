import { useEffect } from "react";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Administration() {
    useEffect(() => {
        InfoPopUp("Полис создан", "popup__Info_green");

        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[10].classList.add("hovered");
    }, []);
}
export { Administration };
