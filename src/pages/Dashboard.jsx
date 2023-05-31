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
    getManagers,
    getDeals,
    chanageDealCard,
} from "../Api";
import { AddStage } from "../components/Dashboard/AddStage";
import { DeleteStage } from "../components/Dashboard/DeleteStage";
import { PopUpCreateDeal } from "../components/Dashboard/PopUpCreateDeal";

function Dashboard() {
    const [stages, setStage] = useState([]);
    const [stageId, setStageId] = useState();
    const [deal, setDeal] = useState();
    const [currentDeal, setCurrentDeal] = useState();
    const [deals, setDeals] = useState([]);
    const [managers, setManagers] = useState([]);
    const [funnels, setFunnels] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [id, setId] = useState();
    const [currentStage, setCurrentStage] = useState({
        stage: {},
        target: "",
        position: "",
    });

    useEffect(() => {
        getManagers().then((data) => {
            setManagers(data);
        });
        getDeals(1).then((data) => {
            setDeals(data);
        });
        getStages(1).then((data) => {
            setStage(data);
        });
        getFunnels().then((data) => {
            setFunnels(data);
        });
        getClients().then((data) => {});
        getClientsBirthdayCount().then((data) => {});
        getClientsBirthday().then((data) => {});

        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[1].classList.add("hovered");
    }, []);

    const newManagersArr = managers.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}`,
    }));

    function showAddStage() {
        if (document.getElementById("addStage")) {
            document
                .querySelector(".container__addStage")
                .classList.toggle("active");
        }
    }
    function showCreateDeal() {
        if (document.querySelector(".container__PopUp_CreateDeal")) {
            document
                .querySelector(".container__PopUp_CreateDeal")
                .classList.toggle("active");
        }
    }

    if (document.querySelector(".card")) {
        document.querySelectorAll(".card").forEach((card) => {
            card.onclick = () => {
                deals.forEach((item) => {
                    let currentCard = item.filter((deal) => deal.id == card.id);
                    if (currentCard.length > 0) {
                        setCurrentDeal(currentCard[0]);
                    }
                });
            };
        });
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

    function onDragEnterArhive(e) {
        e.target.classList.add("arhive");
    }
    function dragleaveArhive(e) {
        e.target.classList.remove("arhive");
    }

    function onDragEnterPaid(e) {}
    function dragleavePaid(e) {}
    function onEnter(e) {}
    function onleave(e) {
        if (!e.currentTarget.classList.contains("paid")) {
            return;
        }
        e.currentTarget.classList.remove("paid");
    }
    function drop(e) {
        e.currentTarget.classList.remove("paid");

        let dealColumn = e.target.closest(".dealColumn");
        console.log(dealColumn);
        let index = Array.from(
            document.querySelectorAll(".dealColumn")
        ).indexOf(dealColumn);
        let stageId = document.querySelectorAll(
            ".containerFlex__header_single"
        )[index].dataset.id;
        chanageDealCard(deal, stageId).then((response) => {
            getDeals(1).then((data) => {
                setDeals(data);
            });
        });
    }
    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add("paid");
    }

    return (
        <div>
            {id ? (
                <DeleteStage id={id} setId={setId} setStage={setStage} />
            ) : (
                <></>
            )}
            {currentDeal ? (
                <PopUpDeal
                    currentDeal={currentDeal}
                    setCurrentDeal={setCurrentDeal}
                />
            ) : (
                <></>
            )}

            <PopUpCreateDeal
                setCurrentDeal={setCurrentDeal}
                newManagersArr={newManagersArr}
                typePolicies={typePolicies}
                stages={stages}
                setDeals={setDeals}
                deals={deals}
            />
            <PopUpNewDeal />
            <Calculations />
            <div className="container__header">
                <Select_2 name="Воронка Продаж" options={funnels} />
                <Select first="В работе" name="Статус" options={status} />
                <Select first="Все" name="Метка" options={label} />
                <Select name="Тип полиса" options={typePolicies} />

                {admin === true ? <Select name="Отдел продаж" /> : ""}

                {admin === true ? (
                    <Select options={newManagersArr} name="Менеджер" />
                ) : (
                    ""
                )}

                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск"
                    style="inputBox__standart"
                />
                <Button name="Поиск" />

                <Button
                    setId="createStage"
                    name="Создать сделку"
                    onClick={showCreateDeal}
                />
            </div>

            <div className="containerFlex">
                <div className=" containerFlex_header">
                    {stages.map((stage) => {
                        return (
                            <Stage
                                currentStage={currentStage}
                                setCurrentStage={setCurrentStage}
                                props={stage}
                                setId={setId}
                                setStage={setStage}
                                setDeals={setDeals}
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

                    <AddStage setDeals={setDeals} setStage={setStage} />
                </div>
                <div className="container__dealCard_scroll">
                    {deals.map((item) => (
                        <div
                            onDragEnter={(e) => {
                                onEnter(e);
                            }}
                            onDragLeave={(e) => {
                                onleave(e);
                            }}
                            className="dealColumn"
                            onDrop={drop}
                            onDragOver={dragOver}
                        >
                            {item.map((dial) => {
                                return (
                                    <DealCard
                                        stageId={stageId}
                                        deal={deal}
                                        setDeal={setDeal}
                                        props={dial}
                                        setDeals={setDeals}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="main__bottom none">
                <div
                    onDragEnter={onDragEnterArhive}
                    onDragLeave={dragleaveArhive}
                    className="main__botton_arhive"
                >
                    В архив
                </div>
                <div
                    onDragEnter={onDragEnterPaid}
                    onDragLeave={dragleavePaid}
                    className="main__botton_paid"
                >
                    Оплачено
                </div>
            </div>
        </div>
    );
}
export { Dashboard };
