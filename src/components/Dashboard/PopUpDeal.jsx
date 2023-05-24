import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { InputFile } from "../Elements/InputFile";
import { useEffect } from "react";

function PopUpDeal() {
    useEffect(() => {
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

        const inputField = document.getElementById("inputField");
        const outputField = document.getElementById("outputField");
        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", () => {
            outputField.innerText = inputField.value;
        });

        if (document.querySelector(".toggleBtn")) {
            document.querySelector(".toggleBtn").onclick = () => {
                document
                    .querySelector(".container__PopUp")
                    .classList.toggle("active");
                document
                    .querySelector(".container__Calculations")
                    .classList.remove("active");
            };
        }
    }, []);
    function showPopUpNewDeal() {
        document
            .querySelector(".container__NewPopUp")
            .classList.toggle("active");
    }
    function showPopUpCalculations() {
        document
            .querySelector(".container__Calculations")
            .classList.toggle("active");
    }

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

    return (
        <div id="container__PopUp" className="container__PopUp">
            <div className="content__PopUp">
                <div className="content__PopUp_header">
                    <p>Название сделки</p>
                    <p>Дата создания</p>
                </div>

                <div id="outputField" className="content__PopUp_comments"></div>
                <div className="content__PopUp_comment ">
                    <Input
                        setId="inputField"
                        name="Добавить комментарий"
                        style="inputBox__standart"
                    />
                    <Button
                        setId="submitButton"
                        style="button_green addComment"
                        name={<ion-icon name="arrow-up-outline"></ion-icon>}
                    />
                    <div className="content__PopUp_btn">
                        <Button style="button_red" name="В архив" />
                        <Button
                            onClick={showPopUpNewDeal}
                            style="button_green"
                            name="Оплачено"
                        />

                        <Button style="toggleBtn" name="Отмена" />
                    </div>
                </div>

                <div className="content__PopUp_input">
                    <Input name="Стоимость сделки" style="inputBox__standart" />
                    <Input name="Дата выполнения" style="inputBox__standart" />
                    <Input name="ФИО клиента" style="inputBox__standart" />
                    <Input
                        setId="happyBithday"
                        divId="divHappyBirthdayClient"
                        name="Дата рождения клиента"
                        style="inputBox__standart"
                        onInput={checkDate}
                    />
                    <Input
                        divId="divPhoneClient"
                        setId="phoneClient"
                        name="Телефон клиента"
                        style="inputBox__standart"
                        onInput={validateInputPhone}
                    />
                    <Input
                        divId="divEmailClient"
                        setId="emailClient"
                        name="Email Клиента"
                        style="inputBox__standart"
                        onInput={validateInputEmail}
                    />
                    <Input name="Регион клиента" style="inputBox__standart" />
                    <Input name="Тип полиса" style="inputBox__standart" />
                    <Input
                        name="Серия и номер полиса"
                        style="inputBox__standart"
                    />
                    <Input
                        name="Объект страхования"
                        style="inputBox__standart"
                    />
                    <Input
                        name="Дата окончания полиса"
                        style="inputBox__standart"
                    />
                    <Input
                        name="Страховая компания"
                        style="inputBox__standart"
                    />
                    <Input name="ФИО страхователя" style="inputBox__standart" />
                    <Input name="Дополнительно" style="inputBox__standart" />
                </div>
                <div
                    id="content__PopUp_files"
                    className="content__PopUp_files"
                ></div>
                <div className="content__PopUp_InputFile">
                    <InputFile setId="popUp_InputFile" name="Загрузить файл" />
                    <Button
                        onClick={showPopUpCalculations}
                        name="Расчёты"
                        style="button_green"
                    />
                </div>
            </div>
        </div>
    );
}

export { PopUpDeal };
