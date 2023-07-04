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
    setCreateDeal,
}) {
    const [baseSource, setBaseSource] = useState([]);
    const admin = useContext(CustomContext);
    const insObject = [
        { id: "car", name: "МАШИНА" },
        { id: "ipoteca", name: "ИПОТЕКА" },
    ];
    let optionsStage = [];
    useEffect(() => {
        getBaseSource().then((list) => {
            setBaseSource(list.results);
        });
    }, []);
    /*Функция наполнения массива этапов*/
    stages.forEach((element) => {
        optionsStage.push(element.stage);
    });
    /*Подсветка обязательных для заполнения полей и создание сделки*/
    function handleClick(e) {
        const popUp = e.target.closest(".main__container");
        popUp
            .querySelectorAll(".requared select, .requared input")
            .forEach((item) => {
                if (item.value == "") {
                    item.classList.add("red_border");
                } else {
                    item.classList.remove("red_border");
                }
            });
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
                getDeals(1).then((data) => {
                    setDeals(data);
                });
            });
        }
        setCreateDeal(false);
    }
    /*Функция отрисовки селектов в зависимости от выбранного*/
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
    /*Функция закрытия popUp создания сделки*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setCreateDeal(false);
            }
        }
    }
    return (
        <div
            onClick={closePopUp}
            className="main__container"
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
                    Fio="Fio"
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
                    Phone="Phone"
                />
                <Input
                    setId="mailCreateDeals"
                    divId="divMailCreateDeals"
                    style="input__medium"
                    name="Почта"
                    Email="Email"
                />
                <Input
                    setId="dateCreateDeals"
                    divId="divDateCreateDeals"
                    style="input__medium"
                    name="Дата Рождения"
                    Birthday="Birthday"
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
                </div>
            </div>
        </div>
    );
}
export { PopUpCreateDeal };
