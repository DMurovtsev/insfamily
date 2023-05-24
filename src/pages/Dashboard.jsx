import { useEffect, useContext, useState } from "react";
import { Select } from "../components/Elements/Select";
import { Select_2 } from "../components/Elements/Select_2";
import { Button } from "../components/Elements/Button";
import { Input } from "../components/Elements/Input";
import { DealCard } from "../components/Dashboard/DealCard";
import { Stage } from "../components/Dashboard/Stage";
import { CustomContext } from "../components/Service/Context";
import { Calculations } from "../components/Dashboard/Calculations";
import { PopUpDeal } from "../components/Dashboard/PopUpDeal";
import { PopUpNewDeal } from "../components/Dashboard/PopUpNewDeal";

import {
    getTypiesPolicies,
    getStages,
    getClients,
    getClientsBirthdayCount,
    getClientsBirthday,
    getFunnels,
} from "../Api";
import { AddStage } from "../components/Dashboard/AddStage";
import { DeleteStage } from "../components/Dashboard/DeleteStage";

function Dashboard() {
    const [stages, setStage] = useState([]);
    const [funnels, setFunnels] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        getStages(1).then((data) => {
            setStage(data);
        });
        getFunnels().then((data) => {
            setFunnels(data);
        });
        getClients().then((data) => {});
        getClientsBirthdayCount().then((data) => {
            // console.log(data);
        });
        getClientsBirthday().then((data) => {
            // console.log(data);
        });

        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[1].classList.add("hovered");

        if (document.querySelector(".card")) {
            document.querySelectorAll(".card").forEach((card) => {
                card.onclick = () => {
                    document
                        .querySelector(".container__PopUp")
                        .classList.toggle("active");
                };
            });
        }
    }, []);

    function showAddStage() {
        if (document.getElementById("addStage")) {
            document.getElementById("addStage").onclick = () => {
                document
                    .querySelector(".container__addStage")
                    .classList.toggle("active");
            };
        }
    }

    const admin = useContext(CustomContext);

    const status = [
        { id: 1, name: "В архиве" },
        { id: 2, name: "Оплачено" },
        { id: 3, name: "Все" },
    ];
    const label = [
        { id: 1, name: "Новые" },
        { id: 2, name: "Сегодня не звонили" },
    ];

    return (
        <div>
            {id ? (
                <DeleteStage id={id} setId={setId} setStage={setStage} />
            ) : (
                <></>
            )}
            <PopUpDeal />
            <PopUpNewDeal />
            <Calculations />
            <div className="container__header">
                <Select_2 name="Воронка Продаж" options={funnels} />
                <Select first="В работе" name="Статус" options={status} />
                <Select first="Все" name="Метка" options={label} />
                <Select name="Тип полиса" options={typePolicies} />

                {admin === true ? <Select name="Отдел продаж" /> : ""}

                {admin === true ? <Select name="Менеджер" /> : ""}

                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск"
                    style="inputBox__standart"
                />
                <Button name="Поиск" />
                <Button name="Создать сделку" />
            </div>

            <div className="containerFlex">
                <div className=" containerFlex_header">
                    {stages.map((stage) => {
                        return (
                            <Stage
                                props={stage}
                                setId={setId}
                                setStage={setStage}
                            />
                        );
                    })}

                    {admin === true ? (
                        <Button
                            onClick={showAddStage}
                            setId="addStage"
                            name="Создать этап"
                        />
                    ) : (
                        ""
                    )}

                    <AddStage setStage={setStage} />
                </div>
                <div className="container__dealCard_scroll">
                    <div className="container__dealCarde">
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                    </div>
                    <div className="container__dealCarde">
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                    </div>
                    <div className="container__dealCarde">
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                        <DealCard />
                    </div>
                </div>
            </div>
            <div className="main__bottom none">
                <div className="main__botton_arhive">В архив</div>
                <div className="main__botton_paid">Оплачено</div>
            </div>
        </div>
    );
}
export { Dashboard };
