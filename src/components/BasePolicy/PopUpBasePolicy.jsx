import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { getFunnels, getStages, giveBasePolicy } from "../../Api";

function PopUpBasePolicy({ setShowBasePolicy, managers, createFilterBody }) {
    const [funnels, setFunnels] = useState([]);
    const [stages, setStage] = useState([]);

    function closeBasePolicy(e) {
        if (!e.target.closest(".container__Acts")) {
            setShowBasePolicy(false);
        }
    }
    function goBasePolicy() {
        let body = createFilterBody();
        let stagesBasePolicy = document.getElementById("stagesBasePolicy");
        let countBasePolicy = document.getElementById("countBasePolicy");
        let managersBasePolicy = document.getElementById("managersBasePolicy");
        if (stagesBasePolicy && stagesBasePolicy.value != "") {
            body["stage"] = stagesBasePolicy.value;
        }
        if (countBasePolicy && countBasePolicy.value != "") {
            body["count"] = countBasePolicy.value;
        }
        if (managersBasePolicy && managersBasePolicy.value != "") {
            body["user"] = managersBasePolicy.value;
        }
        giveBasePolicy(body).then((response) => {});
    }

    useEffect(() => {
        getFunnels().then((data) => {
            setFunnels(data.results);
        });
    }, []);

    function chooseFunnel() {
        let arrStages = [];
        let id = document.getElementById("funnelsBasePolicy").value;
        getStages(id).then((data) => {
            data.forEach((item) => {
                arrStages.push({ id: item.stage.id, name: item.stage.name });
            });
            setStage(arrStages);
        });
    }
    return (
        <div onClick={closeBasePolicy} className="main__container">
            <div className="container__Acts">
                <div className="content__Acts container__Acts">
                    <Select
                        setId="funnelsBasePolicy"
                        options={funnels}
                        onChange={chooseFunnel}
                        name="Воронки"
                        style="requared inputBox__select_largest"
                    />
                    <Select
                        setId="stagesBasePolicy"
                        options={stages}
                        name="Этапы"
                        style="requared inputBox__select_largest"
                    />

                    {/* <Select
                        setId="typePoliciesActs"
                        style="requared inputBox__select_largest"
                        name="Тип полиса"
                        options
                        onChange
                    />
                    <Select
                        setId="channelActs"
                        options
                        style="requared inputBox__select_largest"
                        name="Канал продаж"
                        onChange
                    />
                    <Select
                        setId="companiesActs"
                        options
                        style="requared inputBox__select_largest"
                        name="Страховая компания"
                        onChange
                    /> */}
                    <Input
                        setId="countBasePolicy"
                        name="Кол-во полисов"
                        type="number"
                        style="input__medium"
                    />
                    <Select
                        setId="managersBasePolicy"
                        options={managers}
                        name="Менеджер"
                        style="requared inputBox__select_largest"
                    />
                    <Button
                        onClick={goBasePolicy}
                        style="button_green"
                        name="Передать"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpBasePolicy };
