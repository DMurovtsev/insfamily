import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Select } from "../Elements/Select";
import { getStages, deleteStage } from "../../Api";

function DeleteStage({ id, setId, setStage }) {
    const [stageOptions, setStageOptions] = useState([]);
    useEffect(() => {
        /*Наполняем select и фильтруем его исключая этап на который нажали*/
        getStages(1).then((data) => {
            let arrayStage = [];
            data.forEach((item) => {
                arrayStage.push(item.stage);
            });
            let newArrayStage = arrayStage.filter(function (item) {
                return item.id != id;
            });
            setStageOptions(newArrayStage);
        });
    }, []);
    /*Функция удаления этапа*/
    function deleteArrayStage() {
        let selectId = document.getElementById("selectDeleteStage").value;
        deleteStage(id, selectId).then((response) => {
            setStage(response);
            setId();
        });
    }
    /*Функция закрытия удаления этапа*/
    function close(setId) {
        setId();
    }

    return (
        <div className="contenerDeleteStage">
            <div className="contentDeleteStage">
                <h3>Чтобы удалить этап, нужно перенести сделки на другой</h3>
                <Select
                    first={1}
                    name="Этапы"
                    options={stageOptions}
                    setId="selectDeleteStage"
                />
                <Button onClick={deleteArrayStage} name="Удалить" />
                <Button
                    onClick={(e) => {
                        close(setId);
                    }}
                    name="Отмена"
                />
            </div>
        </div>
    );
}
export { DeleteStage };
