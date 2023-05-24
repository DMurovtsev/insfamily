import { useEffect } from "react";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";

function Telefhony() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[4].classList.add("hovered");
    }, []);
    return (
        <div>
            <div className="main" id="main">
                <div className="container__header">
                    <Select
                        name="Фильтр по звонкам"
                        style="inputBox__select_large"
                    />
                    <Input
                        logo={<ion-icon name="search-outline"></ion-icon>}
                        name="Поиск по звонкам"
                        style="inputBox__standart"
                    />
                </div>
            </div>
        </div>
    );
}
export { Telefhony };
