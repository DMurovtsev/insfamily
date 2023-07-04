import { useContext, useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { SelsDocuments } from "./SelsDocuments";
import { deletePolicy, getSelsDocuments, oneForAllPost } from "../../Api";
import { CustomContext } from "../Service/Context";

function PopUpRedactorSales({
    managers,
    insCompany,
    channel,
    typePolicies,
    currentSales,
    setCurrentSales,
}) {
    const [documents, setDocuments] = useState([]);
    const { admin } = useContext(CustomContext);
    let selectOptionsTypeSales = [
        { id: "newbiz", name: "Новый бизнес" },
        { id: "prolongation", name: "Пролонгация" },
        { id: "transition", name: "Переход" },
        { id: "addendum", name: "Аддендум" },
        { id: "payment", name: "Очередной взнос" },
    ];
    useEffect(() => {
        if (currentSales.half_com_display != "-") {
            let checkbox = document.getElementById("checkBoxSales");
            checkbox.checked = true;
        }
        let id = currentSales.id;
        getSelsDocuments(id).then((file) => {
            setDocuments(file.results);
        });
    }, []);
    /*Функция удаления полиса*/
    function closeRedactorSales() {
        let id = currentSales.id;
        deletePolicy(id).then((response) => {
            setCurrentSales();
        });
    }
    /*Функция редактирования полиса*/
    function editPolicy(e, key, value = null) {
        if (e.target.value == "") {
            return;
        }
        let body = {
            id: currentSales.id,
            model: "policy",
            values: {
                [key]: value != null ? value : e.target.value,
            },
        };
        oneForAllPost(body).then((response) => {});
    }
    /*Функция чекбокса на 50% скидки*/
    function check() {
        let checkbox = document.getElementById("checkBoxSales");
        if (checkbox.checked) {
            return true;
        } else {
            return false;
        }
    }
    /*Функция закрытия PopUp*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".container__PopUp")) {
                setCurrentSales();
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div id="container__PopUp" className="container__PopUp ">
                {currentSales ? (
                    <SelsDocuments
                        currentSales={currentSales}
                        documents={documents}
                    />
                ) : (
                    <></>
                )}
                <div className="content__PopUp content__PopUp_Sales">
                    <div className="content__Sales_btn">
                        {admin ? (
                            <Button
                                onClick={(e) => {
                                    editPolicy(
                                        e,
                                        "accept",
                                        currentSales.accept_display ==
                                            "Проведён"
                                            ? false
                                            : currentSales.accept_display ==
                                              "Сверки"
                                            ? true
                                            : null
                                    );
                                }}
                                style="button_green"
                                name={
                                    currentSales.accept_display == "Проведён"
                                        ? "Вернуть в сверки"
                                        : currentSales.accept_display ==
                                          "Сверки"
                                        ? "Провести"
                                        : ""
                                }
                            />
                        ) : (
                            "Статус"
                        )}
                        {admin ? (
                            <div className="center">
                                <input
                                    onChange={(e) => {
                                        editPolicy(e, "half_com", check());
                                    }}
                                    id="checkBoxSales"
                                    type="checkbox"
                                />
                                <label id="labelCheckBox">50%КВ</label>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Select
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onChange={(e) => {
                            editPolicy(e, "status");
                        }}
                        valueName={currentSales.status_display}
                        style="inputBox__standart_popUp"
                        name="Тип продажи"
                        options={selectOptionsTypeSales}
                    />
                    <Select
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onChange={(e) => {
                            editPolicy(e, "type");
                        }}
                        valueName={currentSales.type__name}
                        style="inputBox__standart_popUp"
                        name="Тип полиса"
                        options={typePolicies}
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        style="inputBox__standart_popUp"
                        onBlur={(e) => {
                            editPolicy(e, "number");
                        }}
                        value={currentSales.number}
                        name="Серия и номер"
                    />
                    <Select
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onChange={(e) => {
                            editPolicy(e, "company");
                        }}
                        valueName={currentSales.company__name}
                        style="inputBox__standart_popUp"
                        name="Страховая компания"
                        options={insCompany}
                    />
                    <Select
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onChange={(e) => {
                            editPolicy(e, "channel");
                        }}
                        valueName={currentSales.channel__name}
                        style="inputBox__standart_popUp"
                        name="Канал продаж"
                        options={channel}
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "commission");
                        }}
                        value={currentSales.commission}
                        name="Премия"
                        style="inputBox__standart_popUp"
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "commission_discont");
                        }}
                        value={currentSales.commission_discont}
                        name="Вход. КВ %"
                        style="inputBox__standart_popUp"
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "commission_rur");
                        }}
                        value={currentSales.commission_rur}
                        name="Вход. КВ РУБ."
                        style="inputBox__standart_popUp"
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "client__full_name");
                        }}
                        value={currentSales.client__full_name}
                        name="Клиент"
                        style="inputBox__standart_popUp"
                    />
                    <Select
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onChange={(e) => {
                            editPolicy(e, "user");
                        }}
                        first={currentSales.user__full_name}
                        style="inputBox__standart_popUp"
                        name="Менеджер"
                        options={managers}
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "date_registration");
                        }}
                        value={currentSales.date_registration}
                        name="Оформлен"
                        style="inputBox__standart_popUp"
                        Date="Date"
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "date_start");
                        }}
                        value={currentSales.date_start}
                        name="Начало действия"
                        style="inputBox__standart_popUp"
                        Date="Date"
                    />
                    <Input
                        none={
                            currentSales.accept_display == "Проведён"
                                ? "none"
                                : ""
                        }
                        onBlur={(e) => {
                            editPolicy(e, "date_end");
                        }}
                        value={currentSales.date_end}
                        name="Окончание действия"
                        style="inputBox__standart_popUp"
                        Date="Date"
                    />
                    <Button
                        style="button_red"
                        onClick={closeRedactorSales}
                        name="Удалить"
                    />
                </div>
            </div>
            //{" "}
        </div>
    );
}
export { PopUpRedactorSales };
