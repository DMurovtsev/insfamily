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
import { Loader } from "../components/Elements/Loader";

function Clients() {
    useEffect(() => {
        getClients(
            "address,first_name,middle_name,last_name,phone,email,birthday"
        ).then((data) => {
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
    let clientsHeaderArray = [
        "Адресс",
        "Имя",
        "Отчество",
        "Фамилия",
        "Телефон",
        "Email",
        "День рождения",
    ];

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
            {clients.length == 0 ? <Loader /> : ""}
            <Table
                header={clientsHeaderArray}
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
