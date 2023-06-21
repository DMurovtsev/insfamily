import { useContext, useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { SelsDocuments } from "./SelsDocuments";
import { getSelsDocuments, oneForAllPost } from "../../Api";
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

    useEffect(() => {
        let id = currentSales.id;
        getSelsDocuments(id).then((file) => {
            setDocuments(file.results);
        });
    }, []);

    let selectOptionsTypeSales = [
        { id: "newbiz", name: "Новый бизнес" },
        { id: "prolongation", name: "Пролонгация" },
        { id: "transition", name: "Переход" },
        { id: "addendum", name: "Аддендум" },
        { id: "payment", name: "Очередной взнос" },
    ];
    function M(e) {
        {
            if (!e.target.closest(".container__PopUp")) {
                setCurrentSales();
            }
        }
    }
    function closeRedactorSales() {
        setCurrentSales();
    }
    function showDocuments() {
        if (document.querySelector(".content__SelsDocuments")) {
            document
                .querySelector(".content__SelsDocuments")
                .classList.add("active");
        }
    }
    function editPolicy(e, key) {
        console.log(e.target.value);
        if (e.target.value == "") {
            return;
        }
        let id = currentSales.id;
        let model = "policy";
        let values = {
            [key]: e.target.value,
        };
        // oneForAllPost(model, values, id).then((response) => {});
    }

    return (
        <div onClick={M} className="popUp__body">
            <div id="container__PopUp" className="container__PopUp ">
                {currentSales ? <SelsDocuments documents={documents} /> : <></>}
                <div className="content__PopUp content__PopUp_Sales">
                    <div className="content__Sales_btn">
                        {admin ? (
                            <Button
                                onClick={(e) => {
                                    editPolicy(e, "accept");
                                }}
                                style="button_green"
                                name={
                                    currentSales.accept === true
                                        ? "Сверка"
                                        : "Проведён"
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {admin ? (
                            <div className="center">
                                <input
                                    onChange={(e) => {
                                        editPolicy(e, "half_com");
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
                        onChange={(e) => {
                            editPolicy(e, "status");
                        }}
                        firstValue={currentSales.status}
                        style="inputBox__standart_popUp"
                        name="Тип продажи"
                        options={selectOptionsTypeSales}
                    />
                    <Select
                        onChange={(e) => {
                            editPolicy(e, "type__name");
                        }}
                        first={currentSales.type__name}
                        style="inputBox__standart_popUp"
                        name="Тип полиса"
                        options={typePolicies}
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "number");
                        }}
                        value={currentSales.number}
                        name="Серия и номер"
                    />
                    <Select
                        onChange={(e) => {
                            editPolicy(e, "company__name");
                        }}
                        first={currentSales.company__name}
                        style="inputBox__standart_popUp"
                        name="Страховая компания"
                        options={insCompany}
                    />
                    <Select
                        onChange={(e) => {
                            editPolicy(e, "channel__name");
                        }}
                        first={currentSales.channel__name}
                        style="inputBox__standart_popUp"
                        name="Канал продаж"
                        options={channel}
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "commission");
                        }}
                        value={currentSales.commission}
                        name="Премия"
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "commission_discont");
                        }}
                        value={currentSales.commission_discont}
                        name="Вход. КВ %"
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "commission_rur");
                        }}
                        value={currentSales.commission_rur}
                        name="Вход. КВ РУБ."
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "client__full_name");
                        }}
                        value={currentSales.client__full_name}
                        name="Клиент"
                    />
                    <Select
                        onChange={(e) => {
                            editPolicy(e, "user__full_name");
                        }}
                        first={currentSales.user__full_name}
                        style="inputBox__standart_popUp"
                        name="Менеджер"
                        options={managers}
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "date_registration");
                        }}
                        value={currentSales.date_registration}
                        name="Оформлен"
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "date_start");
                        }}
                        value={currentSales.date_start}
                        name="Начало действия"
                    />
                    <Input
                        onBlur={(e) => {
                            editPolicy(e, "date_end");
                        }}
                        value={currentSales.date_end}
                        name="Окончание действия"
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
