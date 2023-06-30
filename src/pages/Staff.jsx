import { useEffect, useState } from "react";
import { ClientCard } from "../components/Clients/ClientCard";
import { Button } from "../components/Elements/Button";
import { getSellsDepartment, oneForAll, regManagers } from "../Api";
import { Input } from "../components/Elements/Input";
import { Select } from "../components/Elements/Select";
import { Table } from "../components/Elements/Table";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Staff() {
    const [loader, setLoader] = useState([]);
    const [managers, setManagers] = useState([]);
    const [sd, setSd] = useState([]);
    const [currentPageStuff, setCurrentPageStuff] = useState();
    const [loading, setLoading] = useState(false);

    const values = "full_name,department__name,active_display,id";

    let prevScrollTop = 0;
    let managersHeaderArray = ["ФИО", "Отдел продаж", "Статус", "ID"];
    useEffect(() => {
        filtrManagersSelects();
        getSellsDepartment().then((data) => {
            setSd(data);
        });
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[9].classList.add("hovered");
    }, []);

    function filtrManagersSelects() {
        setLoader(true);
        let stuffSdSelect = document.getElementById("stuffSdSelect");
        let link = "";
        if (stuffSdSelect && stuffSdSelect.value != "") {
            link = link + `&sales_department=${stuffSdSelect.value}`;
        }
        oneForAll(values, "user", undefined, link).then((data) => {
            setManagers(data.results);
            if (data.next_page) {
                setCurrentPageStuff(data.next_page);
            } else {
                setCurrentPageStuff();
            }
            setLoader(false);
        });
    }
    const scrollHandler = (
        e,
        currentPageStuff,
        setCurrentPageStuff,
        loading,
        setLoading,
        setManagers
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageStuff &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageStuff;

            oneForAll(undefined, undefined, next, undefined).then((data) => {
                setManagers((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPageStuff(data.next_page);
                } else {
                    setCurrentPageStuff();
                }
                setLoading(false);
            });
        }
    };
    function addManagers() {
        let formData = new FormData();
        let lastNameAddManagerId = document.getElementById(
            "lastNameAddManagerId"
        ).value;
        let firstNameAddManagerId = document.getElementById(
            "firstNameAddManagerId"
        ).value;
        let middleNameAddManagerId = document.getElementById(
            "middleNameAddManagerId"
        ).value;
        let loginAddManagerId =
            document.getElementById("loginAddManagerId").value;
        let passworAddManagerdId = document.getElementById(
            "passworAddManagerdId"
        ).value;
        let sdAddManagersId = document.getElementById("sdAddManagersId").value;
        formData.append("last_name", lastNameAddManagerId);
        formData.append("first_name", firstNameAddManagerId);
        formData.append("middle_name", middleNameAddManagerId);
        formData.append("username", loginAddManagerId);
        formData.append("password", passworAddManagerdId);
        formData.append("sd", sdAddManagersId);
        regManagers(formData).then((response) => {
            if (response.error_name) {
                InfoPopUp(response.error_name, "popup__Info_red");
            } else {
                InfoPopUp(
                    `${loginAddManagerId} успешно добавлен`,
                    "popup__Info_green"
                );
            }
        });
    }

    return (
        <div>
            <Select
                onChange={filtrManagersSelects}
                setId="stuffSdSelect"
                options={sd}
                style="input__small"
                name="Отдел продаж"
            />
            <div className="container__table_stuff">
                <Table
                    header={managersHeaderArray}
                    loader={loader}
                    scrollHandler={scrollHandler}
                    setLoading={setLoading}
                    currentPage={currentPageStuff}
                    setCurrentPage={setCurrentPageStuff}
                    title="Менеджеры"
                    setData={setManagers}
                    style="container__table_basepolicy"
                    props={managers}
                    loading={loading}
                />

                <div className="addManagers__container">
                    <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                        Добавление Менеджера
                    </h3>
                    <Input
                        style="input__medium"
                        setId="lastNameAddManagerId"
                        name="Фамилия"
                    />
                    <Input
                        style="input__medium"
                        setId="firstNameAddManagerId"
                        name="Имя"
                    />
                    <Input
                        style="input__medium"
                        setId="middleNameAddManagerId"
                        name="Отчество"
                    />
                    <Input
                        style="input__medium"
                        setId="loginAddManagerId"
                        name="Логин"
                    />
                    <Input
                        style="input__medium"
                        setId="passworAddManagerdId"
                        name="Пароль"
                    />
                    <Select
                        style="inputBox__select_largest"
                        setId="sdAddManagersId"
                        options={sd}
                        name="Отдел продаж"
                    />
                    <Button
                        style="button_green"
                        onClick={addManagers}
                        name="Добавить"
                    />
                </div>
            </div>
        </div>
    );
}
export { Staff };
