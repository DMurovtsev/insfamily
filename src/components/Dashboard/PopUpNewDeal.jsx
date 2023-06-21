import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { useEffect } from "react";
import { InfoPopUp } from "../Service/InfoPopUp";
import { Select } from "../Elements/Select";
import { InputFile } from "../Elements/InputFile";

function PopUpNewDeal() {
    useEffect(() => {
        let input_labels = document.querySelectorAll(
            ".content__NewPopUp_inputFile"
        );
        for (let i = 0; i < input_labels.length; i++) {
            input_labels[i].onchange = (e) => {
                let text = `${"Выбранно"} ${e.target.files.length}шт.  <br>`;
                for (let j = 0; j < e.target.files.length; j++) {
                    text = text + "- " + e.target.files[j].name + "<br>";
                }
                e.target.nextElementSibling.innerHTML = text;
                e.target.nextElementSibling.classList.remove("requared");
                e.target.nextElementSibling.classList.add("fullInput");
            };
        }
        if (document.querySelector(".toggleNewBtn")) {
            document.querySelector(".toggleNewBtn").onclick = () => {
                document
                    .querySelector(".content__NewPopUp")
                    .classList.remove("active");
            };
        }
        /*Удаление двойных пробелов*/
        document
            .querySelectorAll(".inputBox__standart_popUp")
            .forEach((item) => {
                item.oninput = (e) => {
                    e.target.value = e.target.value.replace(/\s+/g, " ");
                };
            });

        /*Удаление пробелов в начале и конце строки*/
        document
            .querySelectorAll(".inputBox__standart_popUp")
            .forEach((item) => {
                item.onchange = (e) => {
                    e.target.value = e.target.value.trim();
                };
            });

        /*Установка select по умолчанию*/
        document.getElementById("payId").selectedIndex = 2;
        document.getElementById("creditVehicleId").selectedIndex = 2;
        document.getElementById("kvBnakId").value = 0;
        document.getElementById("insurancePremiumId").value = 0;
        document.getElementById("discountCV").value = 0;
    }, []);

    /*Подсветка незаполненных полей*/
    function handleClick() {
        document.querySelectorAll(".requared select").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "Поля обязательные для заполнения",
                    "popup__Info_red"
                );
            }
        });
        document.querySelectorAll(".requared input").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "Поля обязательные для заполнения",
                    "popup__Info_red"
                );
            }
        });
    }

    /*Валидация на ввод трёх заглавных русских букв*/

    function validateInputSeries() {
        let selectTypePolicy = document.getElementById("typeId");
        if (
            selectTypePolicy[selectTypePolicy.selectedIndex].textContent ==
            "ОСАГО"
        ) {
            let inputField = document.getElementById("seriesId");
            let regex = /[^А-Я]/g;
            let isValidInput = regex.test(inputField.value);
            if (isValidInput) {
                inputField.value = inputField.value.replace(regex, "");
                InfoPopUp(
                    "Введите три заглавные русские буквы",
                    "popup__Info_red"
                );
            }
            if (inputField.value.length > 3) {
                inputField.value = inputField.value.slice(0, 3);
            }
        }
    }
    /*Валидация даты*/
    function checkDate(e) {
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
            }
        }
    }
    /*Сегодняшняя дата*/
    let today = new Date();
    let now = today.toLocaleDateString("ru-RU");

    /*Дата через год*/
    function addYear() {
        const dateInput = document.getElementById("dateNow");
        const dateWithYearInput = document.getElementById("datePlusYear");
        const dateValue = dateInput.value;
        const date = new Date(dateValue);
        date.setFullYear(date.getFullYear() + 1);
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        const ruDate = date.toLocaleString("ru-RU", options);
        dateWithYearInput.value = ruDate;
    }

    /*Наполнение статичных select*/
    let selectOptionsPay = [
        { id: "Cash", name: "Наличные" },
        { id: "NoCash", name: "Безналичный" },
    ];
    let selectOptionsTypeSales = [
        { id: "NewBisnes", name: "Новый бизнес" },
        { id: "Prolongation", name: "Пролонгация" },
        { id: "Transition", name: "Переход" },
        { id: "Addendum", name: "Аддендум" },
        { id: "NextInstallment", name: "Очередной взнос" },
    ];
    let selectOptionsCreditVehicle = [
        { id: "Yes", name: "Да" },
        { id: "No", name: "Нет" },
    ];
    let selectOptionsType = [
        { id: "OSAGO", name: "ОСАГО" },
        { id: "KASKO", name: "КАСКО" },
        { id: "Ipotechnyi", name: "Ипотечный" },
        { id: "Lichnye veshi", name: "Личные вещи" },
    ];
    let selectOptionsCompany = [
        { id: "Sberbank", name: "Сбербанк" },
        { id: "Alfa", name: "Альфа" },
    ];
    let selectOptionsChannel = [
        { id: "IpPodshymalskiy", name: "ИП подшумальский" },
        { id: "NEP", name: "ООО НЭП" },
        { id: "Pampadu", name: "Пампаду" },
    ];
    let selectOptionsBank = [
        { id: "Sber", name: "Сбербанк" },
        { id: "VTB", name: "ВТБ" },
        { id: "Tinkoff", name: "Тинькофф" },
    ];
    let namesForFiles = [
        { review: "Отзыв" },
        { policy: "Полис" },
        { check: "Чек" },
        { zaya: "Заявление" },
        { passport: "Паспорт" },
        { pts: "ПТС" },
        { sts: "СТС" },
        { prava: "Права" },
        { ocenka: "Оценка" },
        { egrn: "ЕГРН" },
        { creditn: "Кредитный" },
    ];

    /*Снятие disabled с канала продаж*/
    function channelUndisable() {
        document.getElementById("channelId").disabled = false;
    }
    /*Сперва выберите компанию*/
    function channelInfo() {
        if (document.getElementById("companyId").value != "") {
            return;
        } else {
            InfoPopUp("Сперва выберите компанию", "popup__Info_red");
        }
    }

    /*Снятие display none с select кв банк*/
    function selectKvBank() {
        const creditVehicleId = document.getElementById("creditVehicleId");
        if (
            creditVehicleId[creditVehicleId.selectedIndex].textContent == "Да"
        ) {
            document.getElementById("divKvBankId").classList.remove("none");
        } else {
            document.getElementById("divKvBankId").classList.add("none");
            document.getElementById("kvBnakId").value = 0;
        }
    }

    /*Всё что связано с изменением типа полиса*/
    /*Добавление input file и классов для них*/
    function selectType() {
        const selectBank = document.getElementById("bankId");
        const selectType = document.getElementById("typeId");
        if (selectType[selectType.selectedIndex].textContent == "КАСКО") {
            document
                .getElementById("divCreditVehicleIdId")
                .classList.remove("none");
            document.getElementById("creditVehicleId").selectedIndex = 2;
        } else {
            document
                .getElementById("divCreditVehicleIdId")
                .classList.add("none");
            document.getElementById("divKvBankId").classList.add("none");
            document.getElementById("kvBnakId").value = 0;
            document.getElementById("creditVehicleId").value = "Нет";
        }

        if (selectType[selectType.selectedIndex].textContent == "Ипотечный") {
            document.getElementById("divBankId").classList.remove("none");
            document
                .getElementById("divIncomingCommissionId")
                .classList.remove("none");
        } else {
            document.getElementById("divBankId").classList.add("none");
            selectBank.selectedIndex = 0;

            document
                .getElementById("divIncomingCommissionId")
                .classList.add("none");
            document.getElementById("incomingCommissionId").value = "";
        }

        if (selectType[selectType.selectedIndex].textContent == "Личные вещи") {
            document.getElementById("seriesId").value = "SLV";
            document.getElementById("divSeriesId").classList.add("requared");
        } else {
            document.getElementById("seriesId").value = "";
        }
        if (selectType[selectType.selectedIndex].textContent == "ОСАГО") {
            document.getElementById("seriesId").value = "XXX";
            document.getElementById("divSeriesId").classList.add("requared");
        }

        let inputFileArray = {
            ОСАГО: {
                requared: ["policy", "review"],
                options: ["pts", "sts", "check", "passport", "prava"],
            },
            КАСКО: {
                requared: ["policy", "zaya", "review"],
                options: ["pts", "sts", "passport", "prava"],
            },
            Ипотечный: {
                requared: ["policy", "check", "review"],
                options: ["passport", "ocenka", "egrn", "creditn"],
            },
            Else: {
                requared: ["policy", "review"],
                options: ["zaya", "check"],
            },
        };
        let namesForFiles = [
            { review: "Отзыв" },
            { policy: "Полис" },
            { check: "Чек" },
            { zaya: "Заявление" },
            { passport: "Паспорт" },
            { pts: "ПТС" },
            { sts: "СТС" },
            { prava: "Права" },
            { ocenka: "Оценка" },
            { egrn: "ЕГРН" },
            { creditn: "Кредитный" },
        ];

        namesForFiles.map((item) => {
            document
                .getElementById(Object.keys(item)[0])
                .parentNode.classList.add("none");
            document
                .getElementById(Object.keys(item)[0])
                .nextElementSibling.classList.remove("requared");
            document
                .getElementById(Object.keys(item)[0])
                .nextElementSibling.classList.remove("fullInput");
            document.getElementById(
                Object.keys(item)[0]
            ).nextElementSibling.innerHTML = ` <i>
            <ion-icon name="cloud-upload-outline"></ion-icon>
        </i> ${Object.values(item)[0]}`;
        });

        if (
            selectType[selectType.selectedIndex].textContent in inputFileArray
        ) {
            inputFileArray[
                selectType[selectType.selectedIndex].textContent
            ].requared.map((name) => {
                document
                    .getElementById(name)
                    .nextElementSibling.classList.add("requared");
                document
                    .getElementById(name)
                    .parentNode.classList.remove("none");
            });
            inputFileArray[
                selectType[selectType.selectedIndex].textContent
            ].options.map((name) => {
                document
                    .getElementById(name)
                    .parentNode.classList.remove("none");
            });
        } else {
            inputFileArray["Else"].requared.map((item) => {
                document
                    .getElementById(item)
                    .nextElementSibling.classList.add("requared");
                document
                    .getElementById(item)
                    .parentNode.classList.remove("none");
            });
            inputFileArray["Else"].options.map((item) => {
                document
                    .getElementById(item)
                    .parentNode.classList.remove("none");
            });
        }
    }

    function selectChannel() {
        const selectChannel = document.getElementById("channelId");
        const selectType = document.getElementById("typeId");
        if (
            (selectType[selectType.selectedIndex].textContent == "ОСАГО" &&
                selectChannel[selectChannel.selectedIndex].textContent ==
                    "Пампаду") ||
            selectChannel[selectChannel.selectedIndex].textContent == "ООО НЭП"
        ) {
            document
                .getElementById("divIncomingCommissionId")
                .classList.remove("none");
        } else {
            document
                .getElementById("divIncomingCommissionId")
                .classList.add("none");
            document.getElementById("incomingCommissionId").value = "";
        }
    }
    function hidePopUpNewDeal() {
        document
            .querySelector(".container__NewPopUp")
            .classList.remove("active");
    }

    return (
        <div className="container__NewPopUp">
            <div className="content__NewPopUp">
                <div className="content__PopUp_input content__NewPopUp_container">
                    <Select
                        setId="payId"
                        name="Оплата"
                        style="inputBox__standart_popUp requared"
                        options={selectOptionsPay}
                        // selected={selectElement}
                    />
                    <Select
                        name="Тип продажи"
                        style="inputBox__standart_popUp requared"
                        options={selectOptionsTypeSales}
                        setId="typeSalesId"
                    />
                    <Select
                        setId="typeId"
                        name="Тип полиса"
                        style="inputBox__standart_popUp requared"
                        options={selectOptionsType}
                        onChange={selectType}
                    />
                    <Select
                        divId="divBankId"
                        setId="bankId"
                        name="Банк"
                        options={selectOptionsBank}
                        style="inputBox__standart_popUp none"
                    />
                    <Input
                        divId="divIncomingCommissionId"
                        setId="incomingCommissionId"
                        name="Входящая комиссия"
                        type="number"
                        step="0.1"
                        style="inputBox__standart_popUp none"
                    />
                    <Select
                        divId="divCreditVehicleIdId"
                        name="Кредитная ТС"
                        style="inputBox__standart_popUp none"
                        setId="creditVehicleId"
                        options={selectOptionsCreditVehicle}
                        onChange={selectKvBank}
                    />
                    <Input
                        setId="kvBnakId"
                        divId="divKvBankId"
                        name="КВ Банк"
                        type="number"
                        step="0.1"
                        style="inputBox__standart_popUp none"
                    />

                    <Input
                        divId="divSeriesId"
                        onInput={validateInputSeries}
                        setId="seriesId"
                        name="Серия"
                        style="inputBox__standart_popUp"
                    />

                    <Input
                        setId="numberId"
                        name="Номер"
                        style="inputBox__standart_popUp requared"
                    />

                    <Input
                        setId="insurancePremiumId"
                        name="Страховая премия"
                        type="number"
                        step="0.1"
                        style="inputBox__standart_popUp requared"
                    />
                    <Select
                        setId="companyId"
                        name="Компания"
                        style="inputBox__standart_popUp requared"
                        onChange={channelUndisable}
                        options={selectOptionsCompany}
                    />
                    <Select
                        setId="channelId"
                        name="Канал продаж"
                        style="inputBox__standart_popUp requared"
                        disabled="true"
                        onClick={channelInfo}
                        options={selectOptionsChannel}
                        onChange={selectChannel}
                    />
                    <Input
                        setId="discountCV"
                        name="Скидка с КВ"
                        type="number"
                        step="0.1"
                        style="inputBox__standart_popUp requared"
                    />

                    <Input
                        name="Дата оформления"
                        value={now}
                        style="inputBox__standart_popUp requared"
                        onInput={checkDate}
                    />
                    <Input
                        name="Дата начала действия полиса"
                        style="inputBox__standart_popUp requared"
                        onInput={checkDate}
                        onBlur={addYear}
                        setId="dateNow"
                    />
                    <Input
                        name="Дата окончания полиса"
                        // value={ruDate}
                        style="inputBox__standart_popUp requared"
                        onInput={checkDate}
                        setId="datePlusYear"
                    />
                </div>
                <div className="content__NewPopUp_inputFile">
                    {namesForFiles.map((item) => (
                        <InputFile
                            setId={Object.keys(item)[0]}
                            name={Object.values(item)[0]}
                            style="none"
                        />
                    ))}
                </div>
                <div className="content__PopUp_btn">
                    <Button
                        onClick={handleClick}
                        style="button_green"
                        name="Сохранить"
                    />
                    <div className="toggleNewBtn">
                        <Button onClick={hidePopUpNewDeal} name="Отмена" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export { PopUpNewDeal };
