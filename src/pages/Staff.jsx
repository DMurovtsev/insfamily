import { useEffect } from "react";
import { ClientCard } from "../components/Clients/ClientCard";
import { Button } from "../components/Elements/Button";

function Staff() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[9].classList.add("hovered");
    }, []);

    return <div></div>;
}
export { Staff };
