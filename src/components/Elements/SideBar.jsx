import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { ToolsMenu } from "../Tools/ToolsMenu";
import { HappyBirthdayClients } from "../Tools/HappyBirthdayClients";
import { ProblemBook } from "../Tools/ProblemBook";
import { LiveTape } from "../Tools/LiveTape";
import { CustomContext } from "../Service/Context";
import { globalSearch } from "../../Api";

function SideBar({}) {
    /*MenuToggle */
    const navigate = useNavigate();
    useEffect(() => {
        if (document.querySelector(".toggle")) {
            document.querySelector(".toggle").onclick = function () {
                if (document.getElementById("main")) {
                    document.getElementById("main").classList.toggle("active");
                }
                document
                    .querySelector(".navigation")
                    .classList.toggle("active");
            };
        }
        if (
            document.querySelector(".navigation").classList.contains("active")
        ) {
            document.getElementById("main").classList.add("active");
        }

        let list = document.querySelectorAll(".navigation li");
        function activeLink() {
            list.forEach((item) => {
                item.classList.remove("hovered");
                item.classList.add("hovered");
            });
        }

        list.forEach((item) => {
            item.addEventListener("onclick", activeLink);
        });
        document.getElementById("btnBack").onclick = (e) => {
            navigate(-1);
        };
    }, []);
    const { admin } = useContext(CustomContext);

    function Search(e) {
        if (document.getElementById("inputGlobalSearch").value) {
            navigate("/SearchResults");
        } else return;
    }

    /*Добавление класса прпи новедении на list item*/

    return (
        <div className="container">
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="#">
                            <img
                                className="logo__sideBar"
                                src="logoContur.png"
                                alt=""
                            />
                            <span className="titleIF">
                                InsFamily <br />
                                <span style={{ fontSize: "13px" }}>
                                    центр страхования
                                </span>
                            </span>
                            <div className="isAdmin">{admin}</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Dashboard">
                            <span className="icon">
                                <ion-icon name="id-card-outline"></ion-icon>
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Clients">
                            <span className="icon">
                                <ion-icon name="person-circle-outline"></ion-icon>
                            </span>
                            <span className="title">Клиенты</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Sales">
                            <span className="icon">
                                <ion-icon name="cash-outline"></ion-icon>
                            </span>
                            <span className="title">Продажи</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Telefhony">
                            <span className="icon">
                                <ion-icon name="call-outline"></ion-icon>
                            </span>
                            <span className="title">Телефония</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Analytics">
                            <span className="icon">
                                <ion-icon name="analytics-outline"></ion-icon>
                            </span>
                            <span className="title">Аналитика</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Finance">
                            <span className="icon">
                                <ion-icon name="newspaper-outline"></ion-icon>
                            </span>
                            <span className="title">Финансы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/FinancialPolicy">
                            <span className="icon">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                            </span>
                            <span className="title">Фин.политика</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Education">
                            <span className="icon">
                                <ion-icon name="library-outline"></ion-icon>
                            </span>
                            <span className="title">Обучение</span>
                        </Link>
                    </li>
                    {admin === true ? (
                        <li>
                            <Link to="/Staff">
                                <span className="icon">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                                <span className="title">Персонал</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    {admin === true ? (
                        <li>
                            <Link to="/Administration">
                                <span className="icon">
                                    <ion-icon name="logo-react"></ion-icon>
                                </span>
                                <span className="title">Администрирование</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    <li>
                        <Link to="/Authorization">
                            <span className="icon">
                                <ion-icon name="skull-outline"></ion-icon>
                            </span>
                            <span className="title">Авторизация</span>
                        </Link>
                    </li>
                    <div className="toggle"></div>
                </ul>
            </div>
            <div className="topbar">
                <Input
                    setId="inputGlobalSearch"
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск"
                    style="inputBox__standart_search"
                    onBlur={Search}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />

                <Button setId="btnBack" name="Назад" />
            </div>
            <ToolsMenu />
            <HappyBirthdayClients />
            <ProblemBook />
            <LiveTape />
        </div>
    );
}

export { SideBar };
