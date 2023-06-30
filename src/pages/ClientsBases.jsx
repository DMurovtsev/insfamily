import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "../components/Elements/Table";
import { useEffect, useState, useContext } from "react";
import {
    addBasePolicy,
    getBaseSource,
    getCompanies,
    getManagers,
    getTypiesPolicies,
    oneForAll,
    oneForAllPost,
} from "../Api";
import { CustomContext } from "../components/Service/Context";
import { InputFile } from "../components/Elements/InputFile";
import { PopUpBasePolicy } from "../components/BasePolicy/PopUpBasePolicy";
function ClientsBases() {
    const navigate = useNavigate();
    const { admin } = useContext(CustomContext);
    if (!admin) {
        navigate(-1);
    }

    const values =
        "base_source__name,type__name,company__name,date_end,car__brand,car__year,car__vin,car__number,ipoteka__bank__name,ipoteka__obj,id";
    const [managers, setManagers] = useState();
    const [insCompany, setInsCompany] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [loader, setLoader] = useState(false);
    const [currentPageClientsBase, setCurrentPageClientsBase] = useState();
    const [loading, setLoading] = useState(false);
    const [basePolicy, setBasePolicy] = useState([]);
    const [baseSource, setBaseSource] = useState([]);
    const [dateValid, setDateValid] = useState(true);
    const [showBasePolicy, setShowBasePolicy] = useState(false);
    let clientsBaseHeaderArray = [
        "Источник",
        "Тип",
        "Компания",
        "Дата окончания",
        "Марка",
        "Год выпуска",
        "VIN",
        "Гос Номер",
        "Банк",
        "Объект страхования",
        "ID",
    ];
    const carYearSelectClientBase = [
        { id: "2022", name: "2022" },
        { id: "2021", name: "2021" },
        { id: "2020", name: "2020" },
        { id: "2019", name: "2019" },
        { id: "older", name: "Старше" },
    ];
    const carBrandSelectClientBase = [
        { id: "AUDI", name: "AUDI" },
        { id: "BMW", name: "BMW" },
        { id: "CHEVROLET", name: "CHEVROLET" },
        { id: "DATSUN", name: "DATSUN" },
        { id: "GEELY", name: "GEELY" },
        { id: "HONDA", name: "HONDA" },
        { id: "HYUNDAI", name: "HYUNDAI" },
        { id: "KIA", name: "KIA" },
        { id: "LADA", name: "LADA" },
        { id: "MAZDA", name: "MAZDA" },
        { id: "MERCEDES", name: "MERCEDES" },
        { id: "MITSUBISHI", name: "MITSUBISHI" },
        { id: "SKODA", name: "SKODA" },
        { id: "VOLKSWAGEN", name: "VOLKSWAGEN" },
    ];

    let prevScrollTop = 0;
    const scrollHandler = (
        e,
        currentPageClientsBase,
        setCurrentPageClientsBase,
        loading,
        setLoading,
        setBasePolicy
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageClientsBase &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageClientsBase;

            oneForAll(undefined, undefined, next, undefined).then((data) => {
                setBasePolicy((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPageClientsBase(data.next_page);
                } else {
                    setCurrentPageClientsBase();
                }
                setLoading(false);
            });
        }
    };
    /*Фильтрация базы полисов по селектам*/
    function filtrBasePolicysSelects() {
        if (!dateValid) {
            return;
        }
        setLoader(true);
        let inworkBasePolicy = document.getElementById("inworkBasePolicy");
        let clientsBaseCompany = document.getElementById("clientsBaseCompany");
        let clientsBaseType = document.getElementById("clientsBaseType");
        let clientsBaseDateStart = document.getElementById(
            "clientsBaseDateStart"
        );
        let clientsBaseDateEnd = document.getElementById("clientsBaseDateEnd");
        let clientsBaseCarBrand = document.getElementById(
            "clientsBaseCarBrand"
        );
        let clientsBaseCarYear = document.getElementById("clientsBaseCarYear");
        let clientBaseSpMin = document.getElementById("clientBaseSpMin");
        let clientBaseSpMax = document.getElementById("clientBaseSpMax");
        let clientsBaseBaseSource = document.getElementById(
            "clientsBaseBaseSource"
        );
        let link = "";

        if (clientsBaseBaseSource && clientsBaseBaseSource.value != "") {
            link = link + `&base_source=${clientsBaseBaseSource.value}`;
        }
        if (clientsBaseCompany && clientsBaseCompany.value != "") {
            link = link + `&company=${clientsBaseCompany.value}`;
        }
        if (clientsBaseType && clientsBaseType.value != "") {
            link = link + `&type=${clientsBaseType.value}`;
        }
        if (clientsBaseDateStart && clientsBaseDateStart.value != "") {
            link = link + `&date_start=${clientsBaseDateStart.value}`;
        }
        if (clientsBaseDateEnd && clientsBaseDateEnd.value != "") {
            link = link + `&date_end=${clientsBaseDateEnd.value}`;
        }
        if (inworkBasePolicy && inworkBasePolicy.value != "") {
            link = link + `&in_work=${inworkBasePolicy.value}`;
        }
        if (clientsBaseCarBrand && clientsBaseCarBrand.value != "") {
            link = link + `&car_brand=${clientsBaseCarBrand.value}`;
        }

        if (clientsBaseCarYear && clientsBaseCarYear.value != "") {
            link = link + `&car_year=${clientsBaseCarYear.value}`;
        }
        if (clientBaseSpMin && clientBaseSpMin.value != "") {
            link = link + `&sp_min=${clientBaseSpMin.value}`;
        }
        if (clientBaseSpMax && clientBaseSpMax.value != "") {
            link = link + `&sp_max=${clientBaseSpMax.value}`;
        }

        if (link != "") {
            link = link.slice(1);
        }

        oneForAll(values, "base_policy", undefined, link).then((data) => {
            setBasePolicy(data.results);
            if (data.next_page) {
                setCurrentPageClientsBase(data.next_page);
            } else {
                setCurrentPageClientsBase();
            }
            setLoader(false);
        });
    }

    const status = [
        { id: "yes", name: "Да" },
        { id: "all", name: "Все" },
    ];

    function createFilterBody() {
        let body = {};
        let searcBasePolicy = document.getElementById("searcBasePolicy");
        let clientsBaseCompany = document.getElementById("clientsBaseCompany");
        let clientsBaseType = document.getElementById("clientsBaseType");
        let clientsBaseDateStart = document.getElementById(
            "clientsBaseDateStart"
        );
        let clientsBaseDateEnd = document.getElementById("clientsBaseDateEnd");
        let clientsBaseCarBrand = document.getElementById(
            "clientsBaseCarBrand"
        );
        let inworkBasePolicy = document.getElementById("inworkBasePolicy");
        let clientsBaseCarYear = document.getElementById("clientsBaseCarYear");
        let clientBaseSpMin = document.getElementById("clientBaseSpMin");
        let clientBaseSpMax = document.getElementById("clientBaseSpMax");
        let clientsBaseBaseSource = document.getElementById(
            "clientsBaseBaseSource"
        );

        if (searcBasePolicy && searcBasePolicy.value != "") {
            body["search"] = searcBasePolicy.value;
        } else {
            if (clientsBaseType && clientsBaseType.value != "") {
                body["type"] = clientsBaseType.value;
            }
            if (inworkBasePolicy && inworkBasePolicy.value != "") {
                body["in_work"] = inworkBasePolicy.value;
            }
            if (clientsBaseDateStart && clientsBaseDateStart.value != "") {
                body["date_start"] = clientsBaseDateStart.value;
            }
            if (clientsBaseCompany && clientsBaseCompany.value != "") {
                body["company"] = clientsBaseCompany.value;
            }
            if (clientsBaseDateEnd && clientsBaseDateEnd.value != "") {
                body["date_end"] = clientsBaseDateEnd.value;
            }
            if (clientsBaseCarBrand && clientsBaseCarBrand.value != "") {
                body["car_brand"] = clientsBaseCarBrand.value;
            }
            if (clientsBaseCarYear && clientsBaseCarYear.value != "") {
                body["car_year"] = clientsBaseCarYear.value;
            }
            if (clientBaseSpMin && clientBaseSpMin.value != "") {
                body["sp_min"] = clientBaseSpMin.value;
            }
            if (clientBaseSpMax && clientBaseSpMax.value != "") {
                body["sp_max"] = clientBaseSpMax.value;
            }
            if (clientsBaseBaseSource && clientsBaseBaseSource.value != "") {
                body["base_source"] = clientsBaseBaseSource.value;
            }
        }
        return body;
    }

    function unloadBasePolicy() {
        let body = createFilterBody();
        body["upload"] = "base_policy";
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
    function showsBasePolicy() {
        setShowBasePolicy(true);
    }

    /*Поиск по BasePolicy
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrBasePolicysSelects();
            return;
        }

        e.target.value = search;
        oneForAll(values, "base_policy", undefined, `search=${search}`).then(
            (response) => {
                setBasePolicy(response.results);
                setLoader(false);
            }
        );
    }

    useEffect(() => {
        filtrBasePolicysSelects();
        getTypiesPolicies().then((data) => {
            setTypePolicies(data);
        });
        getCompanies().then((data) => {
            setInsCompany(data);
        });
        getBaseSource().then((data) => {
            setBaseSource(data.results);
        });
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
    function addBase() {
        let formData = new FormData();
        let input_files = document.getElementById("unloadBasePolicy");
        formData.append("file", input_files.files[0]);
        addBasePolicy(formData).then((response) => {});
    }
    /*Валидация даты*/
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
            if (e.target.value.length != 10) {
                e.target.classList.add("red_border");
                setDateValid(false);
            }

            if (e.target.value.length == 10) {
                e.target.classList.remove("red_border");
                setDateValid(true);

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
    return (
        <div className="containerBaserClients">
            {showBasePolicy ? (
                <PopUpBasePolicy
                    createFilterBody={createFilterBody}
                    managers={managers}
                    setShowBasePolicy={setShowBasePolicy}
                />
            ) : (
                <></>
            )}
            <div className="container__headerBaserClients">
                <Link to="/Clients">
                    <Button name="Клиенты" />
                </Link>

                <Button name="Залить Базу" onClick={showsBasePolicy} />

                <Button name="Выгрузить" onClick={unloadBasePolicy} />
                <InputFile
                    onChange={addBase}
                    style="input-file__input"
                    setId="unloadBasePolicy"
                    name="Загрузить"
                />

                <Input
                    setId="searcBasePolicy"
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск по базе полисов"
                    style="inputBox__standart"
                    onBlur={Search}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
            </div>
            <div className="container__headerBaserClients">
                <Select
                    options={baseSource}
                    setId="clientsBaseBaseSource"
                    name="Источник"
                    style="inputBox__select"
                    onChange={filtrBasePolicysSelects}
                />
                <Select
                    options={insCompany}
                    setId="clientsBaseCompany"
                    name="Компания"
                    style="inputBox__select"
                    onChange={filtrBasePolicysSelects}
                />
                <Select
                    options={typePolicies}
                    setId="clientsBaseType"
                    name="Тип полиса"
                    s
                    style="inputBox__select"
                    onChange={filtrBasePolicysSelects}
                />
                <Select
                    setId="inworkBasePolicy"
                    options={status}
                    first="Нет"
                    firstValue="no"
                    name="В работе"
                    style="requared inputBox__select_largest"
                    onChange={filtrBasePolicysSelects}
                />
                <Input
                    setId="clientsBaseDateStart"
                    onInput={validateDate}
                    name="Дата окончания с"
                    style="inputBox__select_s"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrBasePolicysSelects();
                        }
                    }}
                />
                <Input
                    onInput={validateDate}
                    setId="clientsBaseDateEnd"
                    name="Дата окончания по"
                    style="inputBox__select_s"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrBasePolicysSelects();
                        }
                    }}
                />

                <Select
                    options={carBrandSelectClientBase}
                    setId="clientsBaseCarBrand"
                    name="Марка машины"
                    style="inputBox__select"
                    onChange={filtrBasePolicysSelects}
                />
                <Select
                    setId="clientsBaseCarYear"
                    options={carYearSelectClientBase}
                    style="inputBox__select"
                    name="Год выпуска"
                    onChange={filtrBasePolicysSelects}
                />
                <Input
                    setId="clientBaseSpMin"
                    name="Стоимость полиса от"
                    type="number"
                    style="inputBox__select_s"
                    onBlur={filtrBasePolicysSelects}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrBasePolicysSelects();
                        }
                    }}
                />
                <Input
                    setId="clientBaseSpMax"
                    name="Стоимость полиса до"
                    type="number"
                    style="inputBox__select_s"
                    onBlur={filtrBasePolicysSelects}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrBasePolicysSelects();
                        }
                    }}
                />
            </div>

            <Table
                props={basePolicy}
                loader={loader}
                title="База полисов"
                loading={loading}
                setLoading={setLoading}
                currentPage={currentPageClientsBase}
                setCurrentPage={setCurrentPageClientsBase}
                scrollHandler={scrollHandler}
                header={clientsBaseHeaderArray}
                style="container__table_basepolicy"
                setData={setBasePolicy}
            />
        </div>
    );
}

export { ClientsBases };
