import { useEffect } from "react";
import { StackedBar } from "../components/Elements/StackedBar";

function Finance() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[6].classList.add("hovered");
    }, []);

    return (
        <div>
            <h1>Статистика звонков</h1>
            <StackedBar />
        </div>
    );
}
export { Finance };
