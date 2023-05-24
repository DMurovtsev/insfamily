import { useEffect } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";

function Sales() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[3].classList.add("hovered");
    }, []);

    return (
        <div>
            <div className="main" id="main">
                <div className="container__header">
                    <Button name="Создать АТК" />

                    <Select
                        name="Фильтр по полисам"
                        style="inputBox__select_large"
                    />
                    <Input
                        logo={<ion-icon name="search-outline"></ion-icon>}
                        name="Поиск по полисам"
                        style="inputBox__standart"
                    />
                    <Button name="Добавить полис" />
                </div>
            </div>
        </div>
    );
}
export { Sales };
