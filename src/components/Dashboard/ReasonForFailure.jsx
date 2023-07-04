import { chooseReasonForFailure } from "../../Api";
import { Button } from "../Elements/Button";
import { Select } from "../Elements/Select";

function ReasonForFailure({
    reasonForFailure,
    deal,
    setCurrentDeal,
    setShowReasonForFailure,
}) {
    /*Функция добавления причины отказа*/
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
    /*Функция закрытия причин отказа*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setShowReasonForFailure(false);
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <div className="content__reazon">
                    <h3 style={{ color: "red" }}>
                        {" "}
                        <ion-icon name="alert-circle-outline"></ion-icon>
                        Обязательно выбрать{" "}
                        <ion-icon name="alert-circle-outline"></ion-icon> <br />{" "}
                        причину отказа
                    </h3>
                    <Select
                        style="input__medium"
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
                    </div>
                </div>
            </div>
        </div>
    );
}
export { ReasonForFailure };
