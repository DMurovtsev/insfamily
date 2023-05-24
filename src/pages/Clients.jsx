import { useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Link } from "react-router-dom";
import { Table } from "../components/Elements/Table";
import { CheckBox } from "../components/Elements/CheckBox";
import { AddClients } from "../components/Clients/AddClients";
import { ClientCard } from "../components/Clients/ClientCard";
import { getClients } from "../Api";

function Clients() {
    useEffect(() => {
        getClients().then((data) => {
            setClients(data.results);
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[2].classList.add("hovered");
    }, []);
    const [clients, setClients] = useState([]);

    function showPopUpNewDeal() {
        document
            .querySelector(".container__AddClients")
            .classList.toggle("active");
    }
    function showPopUpNewClientCard() {
        document
            .querySelector(".container__ClientsCard")
            .classList.toggle("active");
    }

    return (
        <div>
            <AddClients />
            <div className="container__header">
                <Link to="/ClientsBases">
                    <Button name="Базы" />
                </Link>

                <Select
                    name="Фильтр по клиентам"
                    style="inputBox__select_large"
                />
                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск клиента"
                    style="inputBox__standart"
                />
                <Button name="Добавить клиента" onClick={showPopUpNewDeal} />
            </div>
            <Table
                props={clients}
                check={<CheckBox />}
                title="Клиенты"
                style="container__table_top"
            />
            <Button name="Карточка клиента" onClick={showPopUpNewClientCard} />
            <ClientCard />
        </div>
    );
}
export { Clients };
