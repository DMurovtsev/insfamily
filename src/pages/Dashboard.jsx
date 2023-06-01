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
    chanageStatusDealCard,
} from "../Api";
import { AddStage } from "../components/Dashboard/AddStage";
import { DeleteStage } from "../components/Dashboard/DeleteStage";
import { PopUpCreateDeal } from "../components/Dashboard/PopUpCreateDeal";

function Dashboard() {
    const [stages, setStage] = useState([]);
    const [idFunnel, setIdFunnel] = useState();
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
        getFunnels().then((data) => {
            let funnelArr = data.results.filter((funnel) => {
                let localId = localStorage.getItem("funnelId");
                if (localId) {
                    return funnel.id == localId;
                } else {
                    return funnel.id == 1;
                }
            });
            setIdFunnel(funnelArr[0]);
            setFunnels(data.results);
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

    useEffect(() => {
        if (idFunnel) {
            getDeals(idFunnel.id).then((data) => {
                setDeals(data);
            });
            getStages(idFunnel.id).then((data) => {
                setStage(data);
            });
        }
    }, [idFunnel]);

    /*Склеивание имени и фамилии менеджера*/
    const newManagersArr = managers.map((item) => ({
        ...item,
        name: `${item.first_name} ${item.last_name}`,
    }));

    /*Отрисовка div создания этапа*/
    function showAddStage() {
        if (document.getElementById("addStage")) {
            document
                .querySelector(".container__addStage")
                .classList.toggle("active");
        }
    }

    /*Отрисовка div созданиz сделки*/
    function showCreateDeal() {
        if (document.querySelector(".container__PopUp_CreateDeal")) {
            document
                .querySelector(".container__PopUp_CreateDeal")
                .classList.toggle("active");
        }
    }
    /*onClick на сделки для открытия подробной сделки*/
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

    /*Наполнение статичных select*/
    const status = [
        { id: 1, name: "В архиве" },
        { id: 2, name: "Оплачено" },
        { id: 3, name: "Все" },
    ];
    const label = [
        { id: 1, name: "Новые" },
        { id: 2, name: "Сегодня не звонили" },
    ];

    /*Отрисовка и стилизация div для смены статуса*/
    function onDragEnterArhive(e) {
        e.target.classList.add("arhive");
    }
    function dragleaveArhive(e) {
        e.target.classList.remove("arhive");
    }

    function onDragEnterPaid(e) {
        e.target.classList.add("sales");
    }
    function dragleavePaid(e) {
        e.target.classList.remove("sales");
    }
    function dragOverPaid(e) {
        e.preventDefault();
    }

    /*Смена статуса перетаскивая сделку*/
    function dropPaid() {
        let status_deal = "paid";
        chanageStatusDealCard(deal, status_deal).then((response) => {
            getDeals(idFunnel.id).then((data) => {
                setDeals(data);
            });
            document
                .querySelector(".container__NewPopUp")
                .classList.add("active");
        });
    }
    function dragOverArhive(e) {
        e.preventDefault();
    }
    function dropArhive() {
        let status_deal = "archived";
        chanageStatusDealCard(deal, status_deal).then((response) => {});
    }

    /*Drag and Drop сделок*/
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

        let index = Array.from(
            document.querySelectorAll(".dealColumn")
        ).indexOf(dealColumn);
        let stageId = document.querySelectorAll(
            ".containerFlex__header_single"
        )[index].dataset.id;
        chanageDealCard(deal, stageId).then((response) => {
            getDeals(idFunnel.id).then((data) => {
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
                    setDeals={setDeals}
                    idFunnel={idFunnel}
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
                <Select_2
                    name="Воронка Продаж"
                    options={funnels}
                    setDeals={setDeals}
                    setStage={setStage}
                    setFunnels={setFunnels}
                    setIdFunnel={setIdFunnel}
                    idFunnel={idFunnel}
                />
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
                                idFunnel={idFunnel}
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

                    <AddStage
                        setDeals={setDeals}
                        setStage={setStage}
                        idFunnel={idFunnel}
                    />
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
                    onDragOver={dragOverArhive}
                    onDrop={dropArhive}
                >
                    В архив
                </div>
                <div
                    onDragEnter={onDragEnterPaid}
                    onDragLeave={dragleavePaid}
                    className="main__botton_paid"
                    onDragOver={dragOverPaid}
                    onDrop={dropPaid}
                >
                    Оплачено
                </div>
            </div>
        </div>
    );
}
export { Dashboard };
