import { useEffect } from "react";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
function Calculations() {
    useEffect(() => {}, []);
    return (
        <div className="container__Calculations">
            <div className="content__Calculations">
                <h3>Расчёты </h3>
                <div className="input__Calculations">
                    <label htmlFor="">Сбербанк </label>
                    <input style={{ textAlign: "center" }} type="number" />
                    <div className="deleteCalcInput">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                </div>
                <div className="input__Calculations">
                    <label htmlFor="">Альфабанк </label>
                    <input style={{ textAlign: "center" }} type="number" />
                    <div className="deleteCalcInput">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </div>
                </div>
                <div className="container__flex_calc">
                    <Select name="Компания" />{" "}
                    <Input style="inputBox__small" name="Сумма" />
                </div>
            </div>
        </div>
    );
}
export { Calculations };
