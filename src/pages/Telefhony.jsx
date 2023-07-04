import { useEffect, useContext, useState } from "react";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { getManagersTelefony } from "../Api";
import { CustomContext } from "../components/Service/Context";

function Telefhony() {
    const { admin } = useContext(CustomContext);
    const [managers, setManagers] = useState();
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[4].classList.add("hovered");
    }, []);
    useEffect(() => {
        if (admin) {
            getManagersTelefony().then((data) => {
                console.log(data);
                setManagers(data);
            });
        }
    }, [admin]);
    if (managers) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }

    return (
        <div>
            <div className="main" id="main">
                <div className="container__header">
                    <Select
                        options={managers}
                        name="Менеджер"
                        style="inputBox__select"
                    />
                    <Input name="Фильтр по дате" style="input__small" />
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
