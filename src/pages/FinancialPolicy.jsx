import { useEffect } from "react";

function FinancialPolicy() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[7].classList.add("hovered");
    }, []);

    return;
}
export { FinancialPolicy };
