import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { createStages, getDeals } from "../../Api";
import { useEffect } from "react";

function AddStage({ setStage, setDeals }) {
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

    function addNewStage() {
        let addNewStage = document.getElementById("inputAddNewStage").value;
        createStages(1, addNewStage).then((response) => {
            setStage(response);
            getDeals(1).then((data) => {
                setDeals(data);
            });
            document
                .querySelector(".container__addStage")
                .classList.remove("active");
        });
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
                    name={<ion-icon name="checkmark-outline"></ion-icon>}
                />
                <Button
                    setId="cancelAddStage"
                    name={<ion-icon name="trash-outline"></ion-icon>}
                />
            </div>
        </div>
    );
}
export { AddStage };
