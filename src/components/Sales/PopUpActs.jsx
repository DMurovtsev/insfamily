import { Select } from "../Elements/Select";
import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { useEffect, useState } from "react";
import { addActSales, createActSales } from "../../Api";

function PopUpActs({
    month,
    now,
    setShowActs,
    typePolicies,
    insCompany,
    channel,
}) {
    const [count, setCount] = useState([]);
    useEffect(() => {
        getCountPolisiesAndValue();
    }, []);
    function closeActs(e) {
        if (!e.target.closest(".container__Acts")) {
            setShowActs(false);
        }
    }
    /*Функция создания body для создания акта*/
    function creareFormData() {
        let formData = new FormData();
        let typePoliciesActs = document.getElementById("typePoliciesActs");
        let channelActs = document.getElementById("channelActs");
        let companiesActs = document.getElementById("companiesActs");
        let nowActs = document.getElementById("nowActs");
        let monthActs = document.getElementById("monthActs");
        if (nowActs) {
            formData.append("date_start", nowActs.value);
        }
        if (monthActs) {
            formData.append("date_end", monthActs.value);
        }
        if (typePoliciesActs && typePoliciesActs.value != "") {
            formData.append("type", typePoliciesActs.value);
        }
        if (channelActs && channelActs.value != "") {
            formData.append("channel", channelActs.value);
        }
        if (companiesActs && companiesActs.value != "") {
            formData.append("companies", companiesActs.value);
        }
        return formData;
    }
    /*Функция получения колличества актов*/
    function getCountPolisiesAndValue() {
        let formData = creareFormData();
        addActSales(formData).then((response) => {
            setCount(response);
        });
    }
    /*Функция создания акта*/
    function createAct() {
        let nameAct = document.getElementById("nameAct");
        if (nameAct && nameAct.value != "") {
            let formData = creareFormData();
            formData.append("name", nameAct.value);
            createActSales(formData).then((response) => {
                console.log(response);
            });
        }
    }
    return (
        <div onClick={closeActs} className="main__container">
            <div className="container__Acts">
                <div className="content__PopUp_CreateDeal container__Acts">
                    <div className="content__PopUp_btn">
                        <div className="big">
                            <ion-icon name="reader-outline"></ion-icon>
                            {count.count}
                        </div>
                        <div className="big">
                            <ion-icon name="cash-outline"></ion-icon>
                            {count.sum}
                        </div>
                    </div>
                    <Select
                        setId="typePoliciesActs"
                        style="requared inputBox__select_largest"
                        name="Тип полиса"
                        options={typePolicies}
                        onChange={getCountPolisiesAndValue}
                    />
                    <Select
                        setId="channelActs"
                        options={channel}
                        style="requared inputBox__select_largest"
                        name="Канал продаж"
                        onChange={getCountPolisiesAndValue}
                    />
                    <Select
                        setId="companiesActs"
                        options={insCompany}
                        style="requared inputBox__select_largest"
                        name="Страховая компания"
                        onChange={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="nowActs"
                        value={now}
                        style="input__medium  requared"
                        name="Дата оформления с"
                        onBlur={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="monthActs"
                        value={month}
                        style="input__medium  requared"
                        name="Дата оформления по"
                        onBlur={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="nameAct"
                        name="Название Акта"
                        style="input__medium  requared"
                    />
                    <Button
                        onClick={createAct}
                        style="button_green"
                        name="Создать Акт"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpActs };
