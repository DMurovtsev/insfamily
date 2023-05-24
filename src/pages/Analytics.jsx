import { useEffect } from "react";

function Analytics() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[5].classList.add("hovered");
    }, []);

    return <div className="main"></div>;
}
export { Analytics };
