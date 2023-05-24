import { useEffect, useContext } from "react";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { Select_2 } from "../components/Elements/Select_2";

function Administration() {
    useEffect(() => {
        InfoPopUp("Полис создан", "popup__Info_green");

        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[10].classList.add("hovered");
    }, []);

 

    return <Select_2 />;
}
export { Administration };
