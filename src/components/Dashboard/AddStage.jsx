import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { createStages, getDeals } from "../../Api";
import { useEffect } from "react";

function AddStage({ setStage, setDeals, idFunnel }) {
    useEffect(() => {
        if (document.getElementById("cancelAddStage")) {
            document.getElementById("cancelAddStage").onclick = () => {
                document.getElementById("inputAddNewStage").value = "";
                document
                    .querySelector(".container__addStage")
                    .classList.toggle("active");
            };
        }
    }, []);
    /*Функция добавления нового этапа*/
    function addNewStage() {
        let addNewStage = document.getElementById("inputAddNewStage").value;
        if (idFunnel) {
            createStages(idFunnel.id, addNewStage).then((response) => {
                setStage(response);
                getDeals(idFunnel.id).then((data) => {
                    setDeals(data);
                });
                document
                    .querySelector(".container__addStage")
                    .classList.remove("active");
            });
        }
    }

    return (
        <div className="container__addStage">
            <div className="content__addStage">
                <Input
                    setId="inputAddNewStage"
                    name="Название этапа"
                    style="input__small"
                />
                <Button
                    onClick={addNewStage}
                    setId="addNewStage"
                    style="button_green"
                    name={<ion-icon name="checkmark-outline"></ion-icon>}
                />
                <Button
                    style="button_red"
                    setId="cancelAddStage"
                    name={<ion-icon name="trash-outline"></ion-icon>}
                />
            </div>
        </div>
    );
}
export { AddStage };
