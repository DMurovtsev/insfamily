import { useEffect, useContext, useState } from "react";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { getManagersTelefony } from "../Api";
import { CustomContext } from "../components/Service/Context";
import { Loader } from "../components/Elements/Loader";

function Telefhony() {
    const { admin } = useContext(CustomContext);
    const [managers, setManagers] = useState();
    const [telefony, setTelefony] = useState();
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [link, setLink] = useState("");
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[4].classList.add("hovered");
        getManagersTelefony(`statistics&page_size=100`).then((data) => {
            setTelefony(data);
            setCurrentPage(1);
        });
    }, []);
    useEffect(() => {
        if (admin) {
            getManagersTelefony("abonents").then((data) => {
                setManagers(data);
            });
        }
    }, [admin]);
    if (managers) {
        managers.forEach((user, i) => {
            if (user.firstName) {
                managers[i]["name"] = `${user.firstName} ${user.lastName}`;
            }
            if (!user.firstName) {
                managers[i]["name"] = `${user.lastName}`;
            }
            managers[i]["id"] = user.userId;
        });
    }
    function filtrManagersTelefony() {
        setLoader(true);
        let managersTelefonyId = document.getElementById("managersTelefonyId");
        let dateStartTelefonyId = document.getElementById(
            "dateStartTelefonyId"
        );
        let dateEndTelefonyId = document.getElementById("dateEndTelefonyId");
        let newLink = "";
        if (managersTelefonyId && managersTelefonyId.value != "") {
            newLink = newLink + `&user_id=${managersTelefonyId.value}`;
        }
        if (dateStartTelefonyId && dateStartTelefonyId.value != "") {
            newLink = newLink + `&date_start=${dateStartTelefonyId.value}`;
        }
        if (dateEndTelefonyId && dateEndTelefonyId.value != "") {
            newLink = newLink + `&date_end=${dateEndTelefonyId.value}`;
        }
        setLink(newLink);
        getManagersTelefony(`statistics&page_size=100${newLink}`).then(
            (data) => {
                setTelefony(data);
                setCurrentPage(1);
            }
        );
        setLoader(false);
    }
    /*Поиск по Telefony
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrManagersTelefony();
            return;
        }
        e.target.value = search;
    }
    /*Функция скроллинга для таблицы клиентов*/
    let prevScrollTop = 0;
    const scrollHandler = (e) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPage &&
            !loading
        ) {
            setLoading(true);
            getManagersTelefony(
                `statistics&page=${currentPage}&page_size=100${link}`
            ).then((data) => {
                if (data.length == 0) {
                    setCurrentPage();
                    return;
                }
                setTelefony((prevState) => [...prevState, ...data]);
                setCurrentPage((prevState) => {
                    return prevState + 1;
                });
                setLoading(false);
            });
        }
    };

    function duration(minetsAndSeconds) {
        const time = Math.floor(minetsAndSeconds / 1000);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        let duratin = minutes + " минут " + seconds + " секунд";
        return duratin;
    }
    function newDate(data) {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const formattedDate = `${day}.${month}.${year}-${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    return (
        <div className="main" id="main">
            <div className="container__header_clients">
                <Select
                    onChange={filtrManagersTelefony}
                    setId="managersTelefonyId"
                    options={managers}
                    name="Менеджер"
                    style="inputBox__select"
                />
                <Input
                    setId="dateStartTelefonyId"
                    Date="Date"
                    name="Дата звонков с"
                    style="input__small"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrManagersTelefony();
                        }
                    }}
                />
                <Input
                    setId="dateEndTelefonyId"
                    Date="Date"
                    name="Дата звонков по"
                    style="input__small"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrManagersTelefony();
                        }
                    }}
                />
                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск по звонкам"
                    style="inputBox__standart"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
            </div>
            <div
                onScroll={(e) => {
                    scrollHandler(e);
                }}
                className="container__table_telefony"
            >
                <h2 className="heading ">Звонки</h2>
                {loader ? (
                    <Loader />
                ) : (
                    <table className="table">
                        <thead className="table_thead">
                            <tr>
                                <th>Дата и Время</th>
                                <th>Менеджер</th>
                                <th>Тип вызова</th>
                                <th>Телефон</th>
                                <th>Длительность</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {telefony ? (
                                telefony.map((call) => (
                                    <tr className="trTableSales">
                                        <td>{newDate(call.startDate)}</td>
                                        <td>{call.abonent}</td>
                                        <td>
                                            {call.direction === "OUTBOUND"
                                                ? "Исходящий"
                                                : "Входящий"}
                                        </td>
                                        <td>{call.phone}</td>
                                        <td>{duration(call.duration)}</td>
                                        <td>
                                            {call.status === "PLACED" ? (
                                                "Сделан"
                                            ) : call.status === "RECIEVED" ? (
                                                "Принят"
                                            ) : call.status === "MISSED" ? (
                                                "Пропущен"
                                            ) : call.status === "REDIRECTED" ? (
                                                "Переадресован"
                                            ) : (
                                                <></>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
export { Telefhony };
