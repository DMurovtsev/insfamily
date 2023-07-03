import { useEffect } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { InfoPopUp } from "../Service/InfoPopUp";
import { addClient } from "../../Api";
import { ValidatePhone } from "../Service/ValidatePhone";
import { ValidateEmail } from "../Service/ValidateEmail";

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

    /*Закртие popUp добавления клиента*/
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
    /*Функция создания клиента*/
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
    /*Валидация ФИО*/
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
                        Birthday="Birthday"
                    />
                    <Input
                        setId="addPhoneClient"
                        divId="divAddPhoneClient"
                        name="Телефон клиента"
                        style="inputBox__standart requared"
                        Phone="Phone"
                    />
                    <Input
                        setId="addEmailClient"
                        divId="divAddEmailClient"
                        name="Email Клиента"
                        style="inputBox__standart"
                        Email="Email"
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
                        onInput={(e) => {
                            ValidatePhone(e);
                        }}
                        style="inputBox__standart"
                    />
                    <Input
                        divId="divAddEmailClientFace"
                        setId="addEmailClientFace"
                        onInput={(e) => {
                            ValidateEmail(e);
                        }}
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
