import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Table } from "../components/Elements/Table";
import {
    getChannels,
    getCompanies,
    getManagers,
    getTypiesPolicies,
    oneForAll,
} from "../Api";
import { CustomContext } from "../components/Service/Context";
import { Loader } from "../components/Elements/Loader";
import { PopUpRedactorSales } from "../components/Sales/PopUpRedactorSales";

function Sales() {
    const [policies, setPolicies] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [channel, setChannel] = useState([]);
    const [insCompany, setInsCompany] = useState([]);
    const [managers, setManagers] = useState();
    const [currentPagePolicy, setCurrentPagePolicy] = useState();
    const [loading, setLoading] = useState(false);
    const { admin } = useContext(CustomContext);
    const [loader, setLoader] = useState(false);
    const values =
        "status,type__name,number,company__name,channel__name,commission,commission_discont,commission_rur,client__full_name,user__full_name,date_registration,date_start,date_end";

    let policiesHeaderArray = [
        "Тип продажи",
        "Тип полиса",
        "Серия и номер",
        "Компания",
        "Канал продаж",
        "Премия",
        "Вход. КВ %",
        "Вход. КВ руб.",
        "Клиент",
        "Менеджер",
        "Оформлен",
        "Начало действия",
        "Окончание действия",
    ];

    const scrollHandler = (
        e,
        currentPagePolicy,
        setCurrentPagePolicy,
        loading,
        setLoading,
        setPolicies
    ) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPagePolicy &&
            !loading
        ) {
            setLoading(true);
            let next = currentPagePolicy;
            oneForAll(undefined, undefined, next).then((data) => {
                setPolicies((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPagePolicy(data.next_page);
                } else {
                    setCurrentPagePolicy();
                }
                setLoading(false);
            });
        }
    };
    /*Фильтрация продаж по селектам*/
    function filtrSelects() {
        setLoader(true);
        let typeValue = document.getElementById("typeSelectSels");
        let channelValue = document.getElementById("channelSelectSels");
        let insCompanyValue = document.getElementById("insCompanySelectSels");
        let managerValue = document.getElementById("managerSelectSels");
        let statusValue = document.getElementById("statusSelectSels");
        let dataStartValue = document.getElementById("inputDateStartSels");
        let dataEndValue = document.getElementById("inputDateEndSels");
        let checkbox = document.getElementById("checkBoxSales");

        let link = "";

        if (typeValue && typeValue.value != "") {
            link = link + `&type=${typeValue.value}`;
        }
        if (channelValue && channelValue.value != "") {
            link = link + `&channel=${channelValue.value}`;
        }
        if (insCompanyValue && insCompanyValue.value != "") {
            link = link + `&company=${insCompanyValue.value}`;
        }
        if (managerValue && managerValue.value != "") {
            link = link + `&user=${managerValue.value}`;
        }
        if (statusValue && statusValue.value != "all") {
            link = link + `&accept=${statusValue.value}`;
        }
        if (dataStartValue && dataStartValue.value != "") {
            link = link + `&date_start=${dataStartValue.value}`;
        }
        if (dataEndValue && dataEndValue.value != "") {
            link = link + `&data_end=${dataEndValue.value}`;
        }
        if (checkbox) {
            if (checkbox.checked) {
                let value = checkbox.value;
                link = link + `&f=${value}`;
            }
        }
        if (link != "") {
            link = link.slice(1);
        }
        oneForAll(values, "policy", undefined, link).then((data) => {
            setPolicies(data.results);
            setLoader(false);
        });
    }
    function validateDate(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (2 < e.target.value.length && e.target.value.length < 5) {
            e.target.value =
                e.target.value.slice(0, 2) + "." + e.target.value.slice(2, 4);
        } else if (e.target.value.length > 4) {
            e.target.value =
                e.target.value.slice(0, 2) +
                "." +
                e.target.value.slice(2, 4) +
                "." +
                e.target.value.slice(4, 8);
            if (e.target.value.length == 10) {
                let newDate = new Date(
                    e.target.value.slice(6, 10),
                    Number(e.target.value.slice(3, 5) - 1),
                    e.target.value.slice(0, 2)
                );
                let inputDate = newDate.toLocaleDateString("ru-RU");
                let dateNow = new Date();
                let now = dateNow.toLocaleDateString("ru-RU");
                const date1 = new Date(now.split(".").reverse().join("-"));
                const date2 = new Date(
                    inputDate.split(".").reverse().join("-")
                );
            }
        }
    }
    /*Сегодняшняя дата*/
    /*Дата через месяц*/

    let today = new Date();
    today.setDate(1);
    let now = today.toLocaleDateString("ru-RU");
    let nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    let month = nextMonth.toLocaleDateString("ru-RU");

    useEffect(() => {
        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        getCompanies().then((data) => {
            setInsCompany(data);
        });
        getChannels().then((data) => {
            setChannel(data);
        });
        filtrSelects();

        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[3].classList.add("hovered");
    }, []);

    useEffect(() => {
        if (admin) {
            getManagers().then((data) => {
                setManagers(data);
            });
        }
    }, [admin]);

    if (managers) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }

    /*Поиск по Sels
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrSelects();
            return;
        }

        e.target.value = search;
        oneForAll(values, "policy", undefined, `search=${search}`).then(
            (response) => {
                setPolicies(response.results);
            }
        );
    }

    const statusSelectSels = [
        { id: "all", name: "Все" },
        { id: "true", name: "Проведён" },
    ];
    function click(e) {
        console.log(e.currentTarget);
    }

    return (
        <div className="main" id="main">
            {/* {typePolicies ? (
                <PopUpRedactorSales
                    typePolicies={typePolicies}
                    setTypePolicies={setTypePolicies}
                    channel={channel}
                    insCompany={insCompany}
                    managers={managers}
                />
            ) : (
                <></>
            )} */}

            <div className="container__header_sales">
                <Button name="Создать АТК" />

                <Select
                    onChange={filtrSelects}
                    setId="typeSelectSels"
                    options={typePolicies}
                    name="Тип полиса"
                    style="inputBox__select_larg"
                />
                <Select
                    onChange={filtrSelects}
                    setId="channelSelectSels"
                    options={channel}
                    name="Канал продаж"
                    style="inputBox__select_larg"
                />
                <Select
                    onChange={filtrSelects}
                    setId="insCompanySelectSels"
                    options={insCompany}
                    name="Страховая компания"
                    style="inputBox__select_largest"
                />
                {admin ? (
                    <Select
                        onChange={filtrSelects}
                        setId="managerSelectSels"
                        options={managers}
                        name="Менеджер"
                        style="inputBox__select"
                    />
                ) : (
                    <></>
                )}
                {admin ? (
                    <Select
                        first="Сверка"
                        firstValue="false"
                        onChange={filtrSelects}
                        setId="statusSelectSels"
                        options={statusSelectSels}
                        name="Статус"
                        style="inputBox__small"
                    />
                ) : (
                    <></>
                )}
                <Input
                    setId="inputDateStartSels"
                    onInput={validateDate}
                    style="inputBox__select_s"
                    name="Дата оформления с"
                    value={now}
                    onBlur={filtrSelects}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrSelects();
                        }
                    }}
                />
                <Input
                    setId="inputDateEndSels"
                    onInput={validateDate}
                    style="inputBox__select_s"
                    name="Дата оформления по"
                    value={month}
                />
                {admin ? (
                    <div className="center">
                        <input
                            onChange={filtrSelects}
                            id="checkBoxSales"
                            type="checkbox"
                            name=""
                        />
                        <label id="labelCheckBox">50%КВ</label>
                    </div>
                ) : (
                    <></>
                )}

                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск по полисам"
                    style="inputBox__standart"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
                <Button name="Добавить полис" />
            </div>
            <div className="container__body_sales">
                {loader ? (
                    <Loader />
                ) : (
                    <Table
                        header={policiesHeaderArray}
                        props={policies}
                        title="Продажи"
                        style="container__table_tops"
                        scrollHandler={scrollHandler}
                        currentPage={currentPagePolicy}
                        setCurrentPage={setCurrentPagePolicy}
                        loading={loading}
                        setLoading={setLoading}
                        setPolicies={setPolicies}
                    />
                )}
            </div>
        </div>
    );
}
export { Sales };
