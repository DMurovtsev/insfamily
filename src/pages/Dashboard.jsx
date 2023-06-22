import { useEffect, useContext, useState } from "react";
import { Select } from "../components/Elements/Select";
import { Select_2 } from "../components/Elements/Select_2";
import { Button } from "../components/Elements/Button";
import { Input } from "../components/Elements/Input";
import { DealCard } from "../components/Dashboard/DealCard";
import { Stage } from "../components/Dashboard/Stage";
import { CustomContext } from "../components/Service/Context";
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
    chanageLabelDealCard,
    getCompaniesL,
    getReasonForFailure,
    getSD,
    getScrollDeals,
    getFilterDeals,
    getBanks,
    getChannels,
} from "../Api";
import { AddStage } from "../components/Dashboard/AddStage";
import { DeleteStage } from "../components/Dashboard/DeleteStage";
import { PopUpCreateDeal } from "../components/Dashboard/PopUpCreateDeal";
import { Loader } from "../components/Elements/Loader";

function Dashboard() {
    const [banks, setBanks] = useState([]);
    const [channel, setChannel] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sockets, setSockets] = useState();
    const [currentPage, setCurrentPage] = useState("");
    const [stages, setStage] = useState([]);
    const [companiesL, setCompaniesL] = useState([]);
    const [reasonForFailure, setReasonForFailure] = useState([]);
    const [idFunnel, setIdFunnel] = useState();
    const [stageId, setStageId] = useState();
    const [deal, setDeal] = useState();
    const [currentDeal, setCurrentDeal] = useState();
    const [deals, setDeals] = useState([]);
    const [managers, setManagers] = useState();
    const [funnels, setFunnels] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [id, setId] = useState();
    const [sd, setSd] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentStage, setCurrentStage] = useState({
        stage: {},
        target: "",
        position: "",
    });

    // if (sockets) {
    //     sockets.onmessage = (e) => {
    //         const data = JSON.parse(e.data);
    //         const { type } = data;
    //         if (type == "deals_upgrade") {
    //             let newDeals = deals.map((deal) => {
    //                 if (deal.id == data.deal.id) {
    //                     return data.deal;
    //                 } else {
    //                     return deal;
    //                 }
    //             });
    //             setDeals(newDeals);
    //         }
    //     };
    // }

    useEffect(() => {
        getBanks().then((data) => {
            setBanks(data);
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

        getChannels().then((data) => {
            setChannel(data);
        });
        getClients().then((data) => {});
        getClientsBirthdayCount().then((data) => {});
        getClientsBirthday().then((data) => {});

        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        getCompaniesL().then((data) => {
            setCompaniesL(data);
        });
        getSD().then((data) => {
            setSd(data.results);
        });

        getReasonForFailure().then((data) => {
            setReasonForFailure(data.results);
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
                setDeals(data.results);
                if (data.next_page) {
                    setCurrentPage(data.next_page.split("/")[2]);
                } else {
                    setCurrentPage(null);
                }
            });
            getStages(idFunnel.id).then((data) => {
                setStage(data);
            });
        }

        const socket = new WebSocket(
            `wss://app.insfamily.ru:8001/ws/deals/?${localStorage.getItem(
                "access"
            )}`
        );
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const { type } = data;

            if (type == "deals_upgrade") {
                setDeals((prevDeals) => {
                    return prevDeals.map((j) => {
                        return j.map((deal) => {
                            if (deal.id == data.deal.id) {
                                return data.deal;
                            } else {
                                return deal;
                            }
                        });
                    });
                });
            }
        };
        setSockets(socket);
    }, [idFunnel]);

    const scrollHandler = (e) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPage &&
            !loading
        ) {
            setLoading(true);

            getScrollDeals(`${currentPage}`).then((data) => {
                let newDeals = deals.map((j, i) => {
                    return [...j, ...data.results[i]];
                });
                setDeals(newDeals);
                // prevState.map((j, i) => {
                //     return [...j, ...data.results[i]];
                // });

                if (data.next_page) {
                    setCurrentPage(data.next_page.split("/")[2]);
                } else {
                    setCurrentPage(null);
                }
                setLoading(false);
            });
        }
    };

    if (document.querySelector(".container__dealCard_scroll")) {
        document.querySelector(".container__dealCard_scroll").onscroll = (
            e
        ) => {
            scrollHandler(e);
        };
    }

    /*Отрисовка div создания этапа*/
    function showAddStage() {
        if (document.getElementById("addStage")) {
            document
                .querySelector(".container__addStage")
                .classList.toggle("active");
        }
    }
    /*Поиск по Dashbord
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        let search = e.target.value.trim().replace(/\s+/g, " ");
        e.target.value = search;
        getDeals(idFunnel.id, search).then((response) => {
            setDeals(response.results);
        });
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
                        if (currentCard[0].label == "new") {
                            let label_deal = "no_call";
                            let label_id = currentCard[0].id;
                            chanageLabelDealCard(label_id, label_deal).then(
                                (response) => {
                                    getDeals(idFunnel.id).then((data) => {
                                        setDeals(data.results);
                                    });
                                }
                            );
                        }
                    }
                });
            };
        });
    }
    const { admin } = useContext(CustomContext);
    useEffect(() => {
        if (admin) {
            getManagers().then((data) => {
                setManagers(data);
            });
        }
    }, [admin]);

    /*Наполнение статичных select*/
    const status = [
        { id: "archived", name: "В архиве" },
        { id: "paid", name: "Оплачено" },
        { id: "all", name: "Все" },
    ];
    const label = [
        { id: "new", name: "Новые" },
        { id: "no_call", name: "Сегодня не звонили" },
    ];
    const insObjectRisk = [
        { id: "Жизнь", name: "Жизнь" },
        { id: "Жизнь Имущество", name: "Жизнь Имущество" },
        { id: "Жизнь Имущество Титул", name: "Жизнь Имущество Титул" },
        { id: "Имущество", name: "Имущество" },
        { id: "Имущество Титул", name: "Имущество Титул" },
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
                setDeals(data.results);
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
        setCurrentDeal();
        if (document.querySelector(".container__ReasonForFailure")) {
            document
                .querySelector(".container__ReasonForFailure")
                .classList.toggle("active");
        }
        chanageStatusDealCard(deal, status_deal).then((response) => {});
    }

    /*Функция фильтрации сделок по select*/
    function filtrSelect() {
        setLoader(true);

        let labelValue = null;
        if (document.getElementById("labelSelect").value != "all") {
            labelValue = document.getElementById("labelSelect").value;
        }
        let statusValue = null;
        if (document.getElementById("statusSelect").value != "all") {
            statusValue = document.getElementById("statusSelect").value;
        }
        let typeValue = null;
        if (document.getElementById("typeSelect").value != "") {
            typeValue = document.getElementById("typeSelect").value;
        }
        let sdValue = null;
        if (
            document.getElementById("sdSelect") &&
            document.getElementById("sdSelect").value != ""
        ) {
            sdValue = document.getElementById("sdSelect").value;
        }

        let managerValue = null;
        if (
            document.getElementById("managerSelect") &&
            document.getElementById("managerSelect").value != ""
        ) {
            managerValue = document.getElementById("managerSelect").value;
        }
        let link = "";
        if (labelValue) {
            link = link + `&label=${labelValue}`;
        }
        if (statusValue) {
            link = link + `&status=${statusValue}`;
        }
        if (typeValue) {
            link = link + `&type_policy=${typeValue}`;
        }
        if (sdValue) {
            link = link + `&sales_department=${sdValue}`;
        }
        if (managerValue) {
            link = link + `&user=${managerValue}`;
        }

        getFilterDeals(idFunnel.id, link).then((data) => {
            setDeals(data.results);
            setLoader(false);
        });
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
                setDeals(data.results);
            });
        });
    }
    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add("paid");
    }
    if (managers) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
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
                    insObjectRisk={insObjectRisk}
                    banks={banks}
                    currentDeal={currentDeal}
                    setCurrentDeal={setCurrentDeal}
                    setDeals={setDeals}
                    idFunnel={idFunnel}
                    reasonForFailure={reasonForFailure}
                    companiesL={companiesL}
                    sockets={sockets}
                />
            ) : (
                <></>
            )}

            <PopUpCreateDeal
                insObjectRisk={insObjectRisk}
                banks={banks}
                setCurrentDeal={setCurrentDeal}
                managers={managers}
                typePolicies={typePolicies}
                stages={stages}
                setDeals={setDeals}
            />
            <PopUpNewDeal currentDeal={currentDeal} />

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
                <Select
                    setId="statusSelect"
                    onChange={filtrSelect}
                    first="В работе"
                    firstValue="in_work"
                    name="Статус"
                    options={status}
                />
                <Select
                    setId="labelSelect"
                    onChange={filtrSelect}
                    first="Все"
                    firstValue="all"
                    name="Метка"
                    options={label}
                />
                <Select
                    setId="typeSelect"
                    onChange={filtrSelect}
                    name="Тип полиса"
                    options={typePolicies}
                />

                {admin === true ? (
                    <Select
                        setId="sdSelect"
                        onChange={filtrSelect}
                        options={sd}
                        name="Отдел продаж"
                    />
                ) : (
                    ""
                )}

                {admin === true ? (
                    <Select
                        setId="managerSelect"
                        onChange={filtrSelect}
                        name="Менеджер"
                        options={managers}
                    />
                ) : (
                    ""
                )}

                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск"
                    style="inputBox__standart"
                    setId="inputSearch"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
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
                    <Button
                        setId="createStage"
                        name="Создать сделку"
                        onClick={showCreateDeal}
                    />
                    <AddStage
                        setDeals={setDeals}
                        setStage={setStage}
                        idFunnel={idFunnel}
                    />
                </div>
                {loader ? (
                    <Loader />
                ) : (
                    <div className="container__dealCard_scroll">
                        {deals ? (
                            deals.map((item) => (
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
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                )}
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
