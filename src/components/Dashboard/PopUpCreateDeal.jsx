import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Service/Context";
import { Button } from "../Elements/Button";
import { getBaseSource, createDeals, getDeals } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpCreateDeal({
    typePolicies,
    stages,
    managers,
    setDeals,
    setCurrentDeal,
    banks,
    insObjectRisk,
}) {
    const [baseSource, setBaseSource] = useState([]);
    const admin = useContext(CustomContext);

    useEffect(() => {
        getBaseSource().then((list) => {
            setBaseSource(list.results);
        });
    }, []);

    let optionsStage = [];
    stages.forEach((element) => {
        optionsStage.push(element.stage);
    });

    function cancelCreateDeal() {
        document
            .querySelector(".container__PopUp_CreateDeal")
            .classList.remove("active");
    }

    /*Валидация даты*/
    function checkDate(e) {
        let happyB = document.getElementById("dateCreateDeals");
        let form = document.getElementById("divDateCreateDeals");

        if (happyB.value == "") {
            form.classList.remove("red_border");
        }
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
                let date1 = new Date(now.split(".").reverse().join("-"));
                let date2 = new Date(inputDate.split(".").reverse().join("-"));
                let delta_days = Math.abs(
                    date2.getFullYear() - date1.getFullYear()
                );

                if (delta_days > 100 || delta_days < 14) {
                    form.classList.add("red_border");
                } else {
                    form.classList.remove("red_border");
                }
            }
        }
    }

    /*Валидация email*/
    function validateInputEmail() {
        let form = document.getElementById("divMailCreateDeals");
        let email = document.getElementById("mailCreateDeals").value;
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email.match(pattern)) {
            // form.classList.add("green_border");
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (email == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    /*Валидация номера телефона */
    function validateInputPhone() {
        let form = document.getElementById("divPhoneCreateDeals");
        let phone = document.getElementById("phoneCreateDeals");
        let pattern = /^((\9)+([0-9]){9})$/;
        let regex = /[^\d]/g;
        let index = phone.value.indexOf("9");
        if (index != -1) {
            phone.value = phone.value.slice(index);
        } else {
            phone.value = "";
        }
        phone.value = phone.value.replace(regex, "");
        if (phone.value.length > 10) {
            phone.value = phone.value.slice(0, 10);
        }
        if (phone.value.match(pattern)) {
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (phone.value == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    /*Удаление двойных пробелов*/

    document.querySelectorAll(".input__medium").forEach((item) => {
        item.oninput = (e) => {
            e.target.value = e.target.value.replace(/\s+/g, " ");
        };
    });

    /*Удаление пробелов в начале и конце строки*/
    document.querySelectorAll(".input__medium").forEach((item) => {
        item.onchange = (e) => {
            e.target.value = e.target.value.trim();
        };
    });

    /*Подсветка обязательных для заполнения полей*/
    function handleClick(e) {
        const popUp = e.target.closest(".container__PopUp_CreateDeal");
        popUp
            .querySelectorAll(".requared select, .requared input")
            .forEach((item) => {
                if (item.value == "") {
                    item.classList.add("red_border");
                } else {
                    item.classList.remove("red_border");
                }
            });
        // document.querySelectorAll(".requared input").forEach((item) => {
        //     if (item.value == "") {
        //         item.classList.add("red_border");
        //         InfoPopUp(
        //             "Поля обязательные для заполнения",
        //             "popup__Info_red"
        //         );
        //     } else {
        //         item.classList.remove("red_border");
        //     }
        // });

        if (popUp.querySelectorAll(".red_border").length > 0) {
            InfoPopUp("Поля обязательные для заполнения", "popup__Info_red");
            return;
        } else {
            let basesource_id = document.getElementById("basesource_id").value;
            let type_policy = document.getElementById("type_policy").value;
            let stage_id = document.getElementById("stage_id").value;
            let user = document.getElementById("user").value;
            let full_name = document.getElementById("full_name").value;
            let phone = document.getElementById("phoneCreateDeals").value;
            let email = document.getElementById("mailCreateDeals").value;
            let birthday = document.getElementById("dateCreateDeals").value;
            let address = document.getElementById("address").value;
            let brand = document.getElementById("brandInput").value;
            let year = document.getElementById("yearInput").value;
            let vin = document.getElementById("vinInput").value;
            let number = document.getElementById("gosNomerInput").value;
            let ipoteca = document.getElementById("ipotecaInput").value;
            let bank = document.getElementById("bankInput").value;
            let risk = document.getElementById("riskSelect").value;
            let remainder = document.getElementById("remainderInput").value;

            // if (document.getElementById("brandInput").value != "") {

            // }

            // createDeals(ipoteca, idBank, valueBank).then((response) => {});

            createDeals(
                basesource_id,
                type_policy,
                stage_id,
                user,
                full_name,
                phone,
                email,
                birthday,
                address,
                brand,
                number,
                vin,
                year,
                ipoteca,
                bank,
                risk,
                remainder
            ).then((response) => {
                setCurrentDeal(response);

                document
                    .querySelector(".container__PopUp")
                    .classList.toggle("active");
                document
                    .querySelector(".container__PopUp_CreateDeal")
                    .classList.remove("active");
                getDeals(1).then((data) => {
                    setDeals(data);
                });
            });
        }
        document
            .querySelector(".container__PopUp_CreateDeal")
            .classList.remove("active");
    }

    const insObject = [
        { id: "car", name: "МАШИНА" },
        { id: "ipoteca", name: "ИПОТЕКА" },
    ];

    function showCarObject() {
        if (document.getElementById("selectInsObject")) {
            if (document.getElementById("selectInsObject").value == "car") {
                document
                    .getElementById("brandDivInput")
                    .classList.remove("none");

                document
                    .getElementById("gosNomerDivInput")
                    .classList.remove("none");

                document.getElementById("vinDivInput").classList.remove("none");

                document
                    .getElementById("yearDivInput")
                    .classList.remove("none");
            } else {
                document.getElementById("brandDivInput").classList.add("none");
                document
                    .getElementById("gosNomerDivInput")
                    .classList.add("none");

                document.getElementById("vinDivInput").classList.add("none");

                document.getElementById("yearDivInput").classList.add("none");
            }
        }
        if (document.getElementById("selectInsObject").value == "ipoteca") {
            document.getElementById("ipotecaDivInput").classList.remove("none");
            document.getElementById("bankDivInput").classList.remove("none");
            document.getElementById("riskDivSelect").classList.remove("none");
            document
                .getElementById("remainderDivInput")
                .classList.remove("none");
        } else {
            document.getElementById("ipotecaDivInput").classList.add("none");
            document.getElementById("bankDivInput").classList.add("none");
            document.getElementById("riskDivSelect").classList.add("none");
            document.getElementById("remainderDivInput").classList.add("none");
        }
    }

    return (
        <div
            className="container__PopUp_CreateDeal"
            id="container__PopUp_CreateDeal"
        >
            <div className="content__PopUp_CreateDeal">
                <Select
                    setId="basesource_id"
                    style="requared inputBox__select_largest"
                    name="Источник"
                    options={baseSource}
                />
                <Select
                    setId="type_policy"
                    style="requared inputBox__select_largest"
                    name="Тип полиса"
                    options={typePolicies}
                />
                <Select
                    setId="stage_id"
                    style="requared inputBox__select_largest"
                    options={optionsStage}
                    name="Этап"
                />
                {admin ? (
                    <Select
                        setId="user"
                        style="requared inputBox__select_largest"
                        name="Менеджер"
                        options={managers}
                    />
                ) : (
                    ""
                )}
                <Input
                    setId="full_name"
                    style="input__medium  requared"
                    name="ФИО клиента"
                />
                <Input
                    setId="address"
                    style="input__medium"
                    name="Регион прописки"
                />
                <Input
                    setId="phoneCreateDeals"
                    divId="divPhoneCreateDeals"
                    style="input__medium requared"
                    name="Телефон"
                    onInput={validateInputPhone}
                />
                <Input
                    setId="mailCreateDeals"
                    divId="divMailCreateDeals"
                    style="input__medium"
                    name="Почта"
                    onInput={validateInputEmail}
                />
                <Input
                    setId="dateCreateDeals"
                    divId="divDateCreateDeals"
                    style="input__medium"
                    name="Дата Рождения"
                    onInput={checkDate}
                />
                <Select
                    setId="selectInsObject"
                    style="inputBox__select_largest"
                    name="Объект Страхования"
                    options={insObject}
                    onChange={showCarObject}
                />
                <Input
                    divId="brandDivInput"
                    setId="brandInput"
                    style="input__medium  none"
                    name="Марка"
                />
                <Input
                    setId="gosNomerInput"
                    divId="gosNomerDivInput"
                    style="input__medium  none"
                    name="Гос. Номер"
                />
                <Input
                    setId="vinInput"
                    divId="vinDivInput"
                    style="input__medium none"
                    name="VIN"
                />
                <Input
                    setId="yearInput"
                    divId="yearDivInput"
                    style="input__medium none"
                    name="Год выпуска"
                />
                <Input
                    setId="ipotecaInput"
                    divId="ipotecaDivInput"
                    style="input__medium requared none"
                    name="Ипотека"
                />
                <Select
                    setId="bankInput"
                    divId="bankDivInput"
                    style="input__medium none "
                    name="Банк"
                    options={banks}
                />
                <Select
                    setId="riskSelect"
                    divId="riskDivSelect"
                    style="input__medium requared none"
                    name="Риски"
                    options={insObjectRisk}
                />
                <Input
                    setId="remainderInput"
                    divId="remainderDivInput"
                    style="input__medium none"
                    name="Остаток"
                    type="number"
                    step={0.1}
                />

                <div className="content__PopUp_btn">
                    <Button
                        style="button_green"
                        onClick={handleClick}
                        name="Создать"
                    />
                    <Button
                        style="button_red"
                        onClick={cancelCreateDeal}
                        name="Отмена"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpCreateDeal };
