import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { InputFile } from "../Elements/InputFile";
import { useEffect, useState } from "react";
import {
    addComments,
    addDiscription,
    getDeals,
    redactorIpoteca,
    redactorPopUpDeal,
    redactorPopUpDealCars,
} from "../../Api";
import { ReasonForFailure } from "./ReasonForFailure";
import { Calculations } from "./Calculations";
import { Select } from "../Elements/Select";
import { Link } from "react-router-dom";
import { PopUpNewDeal } from "./PopUpNewDeal";

function PopUpDeal({
    currentDeal,
    setCurrentDeal,
    idFunnel,
    reasonForFailure,
    companiesL,
    setCalc,
    banks,
    insObjectRisk,
    sockets,
}) {
    const [showPopUp, setShowPopUp] = useState(false);

    function redactorDeal(e, i) {
        let id = currentDeal.id;
        let value = e.target.value;
        let key = i;
        redactorPopUpDeal(key, value, id).then((data) => {});
    }
    function redactorCars(e) {
        let carsId = currentDeal.policy.car.id;
        let key = e.target.id.split("-")[0];
        let value = e.target.value;
        redactorPopUpDealCars(carsId, key, value).then((response) => {});
    }
    function redactorMortages(e) {
        let mortagesId = currentDeal.policy.ipoteka.id;
        let key = e.target.id.split("-")[0];
        let value = e.target.value;
        redactorIpoteca(mortagesId, key, value).then((response) => {});
    }
    function showPopUpNewDeal() {
        setShowPopUp(true);
    }
    function showPopUpCalculations() {
        if (document.querySelector(".container__Calculations")) {
            document
                .querySelector(".container__Calculations")
                .classList.toggle("active");
        }
    }

    function showReasonForFailure() {
        if (document.querySelector(".container__ReasonForFailure")) {
            document
                .querySelector(".container__ReasonForFailure")
                .classList.toggle("active");
        }
    }
    let deal = currentDeal.id;

    /*Валидация даты*/
    function checkDate(e) {
        let happyB = document.getElementById("happyBithday");
        let form = document.getElementById("divHappyBirthdayClient");

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
                const date1 = new Date(now.split(".").reverse().join("-"));
                const date2 = new Date(
                    inputDate.split(".").reverse().join("-")
                );
                const delta_days = Math.abs(
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
    function validateOnlyDate(e) {
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

    /*Валидация email*/
    function validateInputEmail() {
        let form = document.getElementById("divEmailClient");
        let email = document.getElementById("emailClient").value;
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
        let form = document.getElementById("divPhoneClient");
        let phone = document.getElementById("phoneClient");
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

    document.querySelectorAll(".inputBox__standart").forEach((item) => {
        item.oninput = (e) => {
            e.target.value = e.target.value.replace(/\s+/g, " ");
        };
    });

    /*Удаление пробелов в начале и конце строки*/
    document.querySelectorAll(".inputBox__standart").forEach((item) => {
        item.onchange = (e) => {
            e.target.value = e.target.value.trim();
        };
    });
    /*Склеиваем ФИО страхователя и задиваем в value input*/
    if (currentDeal.length > 0) {
        const current_deal = {
            fio: `${currentDeal[0].policy.policyholder.first_name} ${currentDeal[0].policy.policyholder.last_name} ${currentDeal[0].policy.policyholder.middle_name}`,
        };
        document.getElementById("popUpDealFioNew").value = current_deal.fio;
    }

    /*Добавление заметки*/
    function Discription() {
        let description = document.getElementById("textareaDiscription").value;
        let id = currentDeal.id;
        addDiscription(description, id).then((responce) => {
            sockets.send(
                JSON.stringify({
                    type: "deals_upgrade",
                    deal_id: id,
                })
            );
            getDeals(idFunnel.id).then((data) => {
                // setDeals(data);
            });
        });
    }
    function addComment() {
        let comment_content = document.getElementById("inputAddComments").value;
        let deal_id = currentDeal.id;
        addComments(deal_id, comment_content).then((responce) => {});
    }

    function whatsUp() {
        let phone = currentDeal.policy.policyholder.phone;
        window.open(`https://web.whatsapp.com/send?phone=${phone}, "_blank"`);
    }
    function M(e) {
        {
            if (!e.target.closest(".container__PopUp") && !showPopUp) {
                setCurrentDeal();
            }
        }
    }
    useEffect(() => {
        if (currentDeal.calcs[0]) {
            document
                .querySelector(".container__Calculations")
                .classList.add("active");
        } else {
            document
                .querySelector(".container__Calculations")
                .classList.remove("active");
        }
        const fileInput = document.getElementById("popUp_InputFile");
        const fileList = document.getElementById("content__PopUp_files");
        if (fileInput) {
            fileInput.addEventListener("change", (event) => {
                fileList.innerHTML = "";
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileName = file.name;
                    const fileSizeBytes = file.size;
                    const fileSizeMB = fileSizeBytes / 1024 ** 2;
                    const fileSizeMBSlice = fileSizeMB.toFixed(2);
                    const listItem = document.createElement("div");
                    listItem.innerHTML = `${fileName} (${fileSizeMBSlice} mb)`;
                    fileList.appendChild(listItem);
                }
            });
        }
    }, []);

    return (
        <div onClick={M} className="popUp__body">
            {showPopUp === true ? (
                <PopUpNewDeal
                    setShowPopUp={setShowPopUp}
                    currentDeal={currentDeal}
                />
            ) : (
                <></>
            )}
            <div id="container__PopUp" className="container__PopUp">
                <div className="content__PopUp">
                    <div className="content__PopUp_header">
                        <p>{currentDeal.name}</p>
                        <p>{currentDeal.date_create}</p>
                    </div>

                    <div className="content__PopUp_comments"></div>
                    <div className="content__PopUp_comment ">
                        <Input
                            setId="inputAddComments"
                            name="Добавить комментарий"
                            style="inputBox__standart"
                        />
                        <Button
                            onClick={addComment}
                            style="button_green addComment"
                            name={<ion-icon name="arrow-up-outline"></ion-icon>}
                        />
                        <div className="content__PopUp_discription">
                            <textarea
                                id="textareaDiscription"
                                className="textareaDiscription"
                                onBlur={Discription}
                            >
                                {currentDeal.description}
                            </textarea>
                        </div>
                        <div className="content__PopUp_btnNew">
                            <Button
                                onClick={showReasonForFailure}
                                style="button_red"
                                name="В архив"
                            />
                            <Button
                                onClick={showPopUpNewDeal}
                                style="button_green"
                                name="Оплачено"
                            />
                        </div>
                    </div>

                    <div className="content__PopUp_input">
                        <Input
                            value={currentDeal.price}
                            name="Стоимость сделки"
                            style="inputBox__standart"
                            onBlur={(e, i) => {
                                redactorDeal(e, "price");
                            }}
                        />
                        <Input
                            value={currentDeal.next_contact_date}
                            name="Дата выполнения"
                            style="inputBox__standart"
                            onBlur={(e, i) => {
                                redactorDeal(e, "next_contact_date");
                            }}
                            onInput={validateOnlyDate}
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.contact_person}
                            name="ФИО клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            none="none"
                            setId="happyBithday"
                            divId="divHappyBirthdayClient"
                            name="Дата рождения клиента"
                            style="inputBox__standart"
                            onInput={checkDate}
                            value={currentDeal.policy.policyholder.birthday}
                        />

                        <Input
                            none="none"
                            divId="divPhoneClient"
                            setId="phoneClient"
                            name="Телефон клиента"
                            style="inputBox__standart"
                            onInput={validateInputPhone}
                            whatsUp={whatsUp}
                            ion_icon={
                                currentDeal.policy.policyholder.phone != ""
                                    ? "ion_icon"
                                    : undefined
                            }
                            value={
                                currentDeal.policy.policyholder.phone
                                    ? currentDeal.policy.policyholder.phone
                                    : ""
                            }
                        />

                        <Input
                            none="none"
                            divId="divEmailClient"
                            setId="emailClient"
                            name="Email Клиента"
                            style="inputBox__standart"
                            onInput={validateInputEmail}
                            value={
                                currentDeal.policy.policyholder.email
                                    ? currentDeal.policy.policyholder.email
                                    : ""
                            }
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.policyholder.address}
                            name="Регион клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.type.name}
                            name="Тип полиса"
                            style="inputBox__standart"
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.number}
                            name="Серия и номер полиса"
                            style="inputBox__standart"
                        />
                        {currentDeal.policy.car ? (
                            <Input
                                setId="brand-Cars"
                                name="Объект страхования"
                                value={currentDeal.policy.car.brand}
                                style="inputBox__standart"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Select
                                setId="obj-Ipoteka"
                                onChange={(e) => {
                                    redactorMortages(e);
                                }}
                                options={insObjectRisk}
                                style="input__medium input__medium_xl"
                                first={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.obj
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}

                        {currentDeal.policy.car ? (
                            <Input
                                setId="number-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="Гос номер"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.number
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.car ? (
                            <Input
                                setId="vin-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="VIN"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.vin
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.car ? (
                            <Input
                                setId="year-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="Год выпуска"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.year
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Select
                                setId="bank-Ipoteka"
                                onChange={(e) => {
                                    redactorMortages(e);
                                }}
                                style="input__medium input__medium_xl"
                                options={banks}
                                name="БАНК"
                                first={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.bank.name
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Input
                                setId="balance-Ipoteka"
                                onBlur={(e) => {
                                    redactorMortages(e);
                                }}
                                name="Остаток"
                                value={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.balance
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}

                        <Input
                            none="none"
                            value={currentDeal.policy.date_end}
                            name="Дата окончания полиса"
                            style="inputBox__standart"
                        />
                        <Input
                            none="none"
                            value={
                                currentDeal.policy.company
                                    ? currentDeal.policy.company.name
                                    : ""
                            }
                            name="Страховая компания"
                            style="inputBox__standart"
                        />
                        <Input
                            none="none"
                            setId="popUpDealFioNew"
                            name="ФИО страхователя"
                            style="inputBox__standart popUpDealFioNew"
                            value={
                                currentDeal.policy.policyholder_text
                                    ? currentDeal.policy.policyholder_text
                                    : ""
                            }
                        />
                        <Input
                            none="none"
                            name="Дополнительно"
                            style="inputBox__standart"
                        />
                    </div>

                    <div
                        id="content__PopUp_files"
                        className="content__PopUp_files"
                    ></div>
                    <div className="content__PopUp_InputFile">
                        <InputFile
                            setId="popUp_InputFile"
                            name="Загрузить файл"
                        />
                        <Button
                            onClick={showPopUpCalculations}
                            name="Расчёты"
                            style="button_green"
                        />
                    </div>

                    <Calculations
                        setCalc={setCalc}
                        companiesL={companiesL}
                        deal={deal}
                        currentDeal={currentDeal}
                        setCurrentDeal={setCurrentDeal}
                    />
                </div>
                <ReasonForFailure
                    setCurrentDeal={setCurrentDeal}
                    reasonForFailure={reasonForFailure}
                    deal={deal}
                />
            </div>
        </div>
    );
}

export { PopUpDeal };
