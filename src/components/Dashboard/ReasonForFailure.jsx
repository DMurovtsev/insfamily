import { chooseReasonForFailure } from "../../Api";
import { Button } from "../Elements/Button";
import { Select } from "../Elements/Select";

function ReasonForFailure({ reasonForFailure, deal, setCurrentDeal }) {
    function closeReasonForFailure() {
        document
            .querySelector(".container__ReasonForFailure")
            .classList.remove("active");
    }

    function addReasonForFailure() {
        if (document.getElementById("selectReasonForFailure")) {
            let reason_for_failure = document.getElementById(
                "selectReasonForFailure"
            ).value;
            chooseReasonForFailure(deal, reason_for_failure).then(
                (response) => {
                    document
                        .querySelector(".container__ReasonForFailure")
                        .classList.remove("active");
                    setCurrentDeal();
                }
            );
        }
    }

    return (
        <div className="container__ReasonForFailure">
            <div className="content__ReasonForFailure">
                <h3>
                    {" "}
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    Обязательно выбрать
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </h3>
                <Select
                    setId="selectReasonForFailure"
                    first="ПРИЧИНА ОТКАЗА"
                    options={reasonForFailure}
                />
                <div className="flexBtn">
                    <Button
                        onClick={addReasonForFailure}
                        name="В архив"
                        style="button_red"
                    />
                    <Button onClick={closeReasonForFailure} name="Отмена" />
                </div>
            </div>
        </div>
    );
}
export { ReasonForFailure };
