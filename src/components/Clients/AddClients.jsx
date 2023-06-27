import { useEffect } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { InfoPopUp } from "../Service/InfoPopUp";
import { addClient } from "../../Api";

function AddClients({ setAddClient }) {
    useEffect(() => {
        const fileInput = document.getElementById("file-input");
        const fileList = document.getElementById("file-list");
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

    /*Валидация даты*/
    function checkDate(e) {
        let happyB = document.getElementById("addHappyBithday");
        let form = document.getElementById("divAddHappyBirthdayClient");

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
                    InfoPopUp("Некоректная дата", "popup__Info_red");
                } else {
                    form.classList.remove("red_border");
                }
            }
        }
    }

    /*Валидация email*/
    function validateInputEmail() {
        let form = document.getElementById("divAddEmailClient");
        let email = document.getElementById("addEmailClient");
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email.value.match(pattern)) {
            // form.classList.add("green_border");
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (email.value == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    function validateInputEmailFace() {
        let form = document.getElementById("divAddEmailClientFace");
        let email = document.getElementById("addEmailClientFace");
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email.value.match(pattern)) {
            // form.classList.add("green_border");
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (email.value == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    /*Валидация номер телефона */
    function validateInputPhone() {
        let form = document.getElementById("divAddPhoneClient");
        let phone = document.getElementById("addPhoneClient");
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
            // form.classList.add("green_border");
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
    function validateInputPhoneFace() {
        let form = document.getElementById("divAddPhoneClientFace");
        let phone = document.getElementById("addPhoneClientFace");
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
            // form.classList.add("green_border");
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
    function M(e) {
        {
            if (!e.target.closest(".container__AddClients")) {
                setAddClient();
            }
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

    function createClient() {
        let r = false;
        document.querySelectorAll(".requared input").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "Поля обязательные для заполнения",
                    "popup__Info_red"
                );
                r = true;
            }
        });
        if (r) {
            return;
        }
        let formData = new FormData();
        if (document.getElementById("fioAddClient").value) {
            formData.append(
                "full_name",
                document.getElementById("fioAddClient").value
            );
        }
        if (document.getElementById("addHappyBithday").value) {
            formData.append(
                "birthday",
                document.getElementById("addHappyBithday").value
            );
        }
        if (document.getElementById("addPhoneClient").value) {
            formData.append(
                "phone",
                document.getElementById("addPhoneClient").value
            );
        }
        if (document.getElementById("addEmailClient").value) {
            formData.append(
                "email",
                document.getElementById("addEmailClient").value
            );
        }
        if (document.getElementById("addAddressClient").value) {
            formData.append(
                "address",
                document.getElementById("addAddressClient").value
            );
        }

        addClient(formData).then((response) => {});
    }
    function validateFIO() {
        let fio = document.getElementById("fioAddClient");
        let regex = /[^a-zA-Zа-яА-Я\s]/g;
        fio.value = fio.value.replace(regex, "");
    }

    return (
        <div onClick={M} className="main__container">
            <div id="container__AddClients" className="container__AddClients">
                <div className="content__PopUp_input ">
                    <Input
                        setId="fioAddClient"
                        name="ФИО клиента"
                        style="inputBox__standart requared"
                        onInput={validateFIO}
                    />
                    <Input
                        setId="addHappyBithday"
                        divId="divAddHappyBirthdayClient"
                        name="Дата рождения клиента"
                        style="inputBox__standart requared"
                        onInput={checkDate}
                    />
                    <Input
                        setId="addPhoneClient"
                        divId="divAddPhoneClient"
                        name="Телефон клиента"
                        style="inputBox__standart requared"
                        onInput={validateInputPhone}
                    />
                    <Input
                        setId="addEmailClient"
                        divId="divAddEmailClient"
                        name="Email Клиента"
                        style="inputBox__standart"
                        onInput={validateInputEmail}
                    />

                    <Input
                        setId="addAddressClient"
                        name="Регион клиента"
                        style="inputBox__standart"
                    />
                    <Input name="Контактное лицо" style="inputBox__standart" />
                    <Input
                        divId="divAddPhoneClientFace"
                        setId="addPhoneClientFace"
                        name="Телефон КЛ"
                        onInput={validateInputPhoneFace}
                        style="inputBox__standart"
                    />
                    <Input
                        divId="divAddEmailClientFace"
                        setId="addEmailClientFace"
                        onInput={validateInputEmailFace}
                        name="Email КЛ"
                        style="inputBox__standart"
                    />
                    <div
                        id="file-list"
                        className="content__AddClients_files"
                    ></div>
                    <div className="addClientsPopUp">
                        <InputFile name="Загрузить файл" setId="file-input" />
                    </div>
                </div>
                <div className="twoBtnAddClients">
                    <Button
                        onClick={createClient}
                        style="button_green"
                        name="Сохранить"
                    />
                </div>
            </div>
        </div>
    );
}
export { AddClients };
