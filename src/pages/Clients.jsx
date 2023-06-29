import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Link } from "react-router-dom";
import { Table } from "../components/Elements/Table";
import { AddClients } from "../components/Clients/AddClients";
import { ClientCard } from "../components/Clients/ClientCard";
import {
    getChannels,
    getCompanies,
    getManagers,
    getTypiesPolicies,
    oneForAll,
    oneForAllPost,
} from "../Api";
import { CustomContext } from "../components/Service/Context";

function Clients() {
    const { admin } = useContext(CustomContext);
    const [typePolicies, setTypePolicies] = useState([]);
    const [insCompany, setInsCompany] = useState([]);
    const [channel, setChannel] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [addClient, setAddClient] = useState(false);
    const [clients, setClients] = useState([]);
    const [currentPageClients, setCurrentPageClients] = useState();
    const [loading, setLoading] = useState(false);
    const [currentClient, setCurrentClient] = useState();

    const values = "full_name,phone,email,address,birthday,user__full_name,id";

    let clientsHeaderArray = [
        "ФИО",
        "Телефон",
        "Email",
        "Адресс",
        "День рождения",
        "Менеджер",
        "ID",
    ];

    /*Фильтрация продаж по селектам*/
    function filtrClientsSelects() {
        setLoader(true);

        let insCompanyClints = document.getElementById("insCompanyClints");
        let channelClints = document.getElementById("channelClints");
        let typePoliciesClints = document.getElementById("typePoliciesClints");
        let managersClints = document.getElementById("managersClints");

        let link = "";

        if (insCompanyClints && insCompanyClints.value != "") {
            link = link + `&company=${insCompanyClints.value}`;
        }
        if (channelClints && channelClints.value != "") {
            link = link + `&channel=${channelClints.value}`;
        }
        if (typePoliciesClints && typePoliciesClints.value != "") {
            link = link + `&type=${typePoliciesClints.value}`;
        }
        if (managersClints && managersClints.value != "") {
            link = link + `&user=${managersClints.value}`;
        }

        if (link != "") {
            link = link.slice(1);
        }

        oneForAll(values, "client", undefined, link).then((data) => {
            setClients(data.results);
            if (data.next_page) {
                setCurrentPageClients(data.next_page);
            } else {
                setCurrentPageClients();
            }
            setLoader(false);
        });
    }

    let prevScrollTop = 0;
    const scrollHandler = (
        e,
        currentPageClients,
        setCurrentPageClients,
        loading,
        setLoading,
        setClients
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageClients &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageClients;

            oneForAll(undefined, undefined, next, undefined).then((data) => {
                setClients((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPageClients(data.next_page);
                } else {
                    setCurrentPageClients();
                }
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        filtrClientsSelects();
        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        getCompanies().then((data) => {
            setInsCompany(data);
        });
        getChannels().then((data) => {
            setChannel(data);
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[2].classList.add("hovered");
    }, []);
    useEffect(() => {
        if (admin) {
            getManagers().then((data) => {
                setManagers(data);
            });
        }
    }, [admin]);
    if (managers.length > 0) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }

    function showPopUpNewDeal() {
        setAddClient(true);
    }

    /*Поиск по Clients
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrClientsSelects();
            return;
        }

        e.target.value = search;
        oneForAll(values, "client", undefined, `search=${search}`).then(
            (response) => {
                setClients(response.results);
                setLoader(false);
            }
        );
    }

    function unloadClients() {
        let body = { upload: "client" };
        let insCompanyClints = document.getElementById("insCompanyClints");
        let channelClints = document.getElementById("channelClints");
        let typePoliciesClints = document.getElementById("typePoliciesClints");
        let managersClints = document.getElementById("managersClints");
        let searchClients = document.getElementById("searchClients");

        if (searchClients && searchClients.value != "") {
            body["search"] = searchClients.value;
        } else {
            if (typePoliciesClints && typePoliciesClints.value != "") {
                body["type"] = typePoliciesClints.value;
            }
            if (channelClints && channelClints.value != "") {
                body["channel"] = channelClints.value;
            }
            if (insCompanyClints && insCompanyClints.value != "") {
                body["company"] = insCompanyClints.value;
            }
            if (managersClints && managersClints.value != "") {
                body["user"] = managersClints.value;
            }
        }

        oneForAllPost(body).then((data) => {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "policy.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    return (
        <div>
            {addClient ? <AddClients setAddClient={setAddClient} /> : <></>}

            <div className="container__header">
                {admin ? (
                    <Link to="/ClientsBases">
                        <Button name="Базы" />
                    </Link>
                ) : (
                    <></>
                )}

                <Select
                    onChange={filtrClientsSelects}
                    setId="insCompanyClints"
                    options={insCompany}
                    name="Компания"
                    style="inputBox__select"
                />
                <Select
                    onChange={filtrClientsSelects}
                    setId="channelClints"
                    options={channel}
                    name="Канал продаж"
                    style="inputBox__select"
                />
                <Select
                    onChange={filtrClientsSelects}
                    setId="typePoliciesClints"
                    options={typePolicies}
                    name="Тип полиса"
                    style="inputBox__select"
                />
                {admin ? (
                    <Select
                        onChange={filtrClientsSelects}
                        setId="managersClints"
                        options={managers}
                        name="Менеджер"
                        style="inputBox__select"
                    />
                ) : (
                    <></>
                )}

                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск клиента"
                    setId="searchClients"
                    style="inputBox__standart"
                    onBlur={Search}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
                <Button name="Добавить клиента" onClick={showPopUpNewDeal} />
                {admin ? (
                    <Button onClick={unloadClients} name="Выгрузить" />
                ) : (
                    <></>
                )}
            </div>
            {/* {clients.length == 0 ? <Loader /> : ""} */}
            <div className="container__body_clients">
                <Table
                    loader={loader}
                    loading={loading}
                    setLoading={setLoading}
                    currentPage={currentPageClients}
                    setCurrentPage={setCurrentPageClients}
                    scrollHandler={scrollHandler}
                    header={clientsHeaderArray}
                    props={clients}
                    title="Клиенты"
                    style="container__table_basepolicy"
                    setData={setClients}
                    setCurrentItem={setCurrentClient}
                />
            </div>
            {currentClient ? (
                <ClientCard
                    currentClient={currentClient}
                    setCurrentClient={setCurrentClient}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
export { Clients };
