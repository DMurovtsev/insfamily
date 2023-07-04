import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { Button } from "../Elements/Button";
import { addCalc, deleteCalc, getCalc } from "../../Api";

function Calculations({ companiesL, deal, currentDeal, setCurrentDeal }) {
    /*Функция создания рассчётов*/
    function createCalc() {
        if (document.getElementById("selectCompaniesL")) {
            let companies_option =
                document.getElementById("selectCompaniesL").value;
            let sum = document.getElementById("inputSum").value;
            addCalc(deal, companies_option, sum).then((response) => {
                getCalc(`?deal=${deal}`).then((data) => {
                    setCurrentDeal({ ...currentDeal, calcs: data.results });
                });
            });
        }
    }
    /*Функция удаления рассчётов*/
    function deleteCalcs(e, id) {
        deleteCalc(id).then((response) => {
            getCalc(`?deal=${deal}`).then((data) => {
                setCurrentDeal({ ...currentDeal, calcs: data.results });
            });
        });
    }
    /*Функция закрытия рассчётов */
    function closeCalculation() {
        document
            .querySelector(".container__Calculations")
            .classList.remove("active");
    }

    return (
        <div
            className={
                currentDeal.calcs
                    ? "container__Calculations active"
                    : "container__Calculations"
            }
        >
            <div className="content__Calculations">
                <h3>Расчёты</h3>
                <div className="list__Calculations">
                    {currentDeal.calcs[0]
                        ? currentDeal.calcs.map((item) => (
                              <div className="list__Calculations_div">
                                  {item.company.name} {item.value}{" "}
                                  <div
                                      onClick={(e) => {
                                          deleteCalcs(e, item.id);
                                      }}
                                      className="trash-outline"
                                  >
                                      <ion-icon name="trash-outline"></ion-icon>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
                <div className="container__flex_calc">
                    <Select
                        setId="selectCompaniesL"
                        name="Компания"
                        options={companiesL}
                    />
                    <Input
                        setId="inputSum"
                        step="0.1"
                        type="number"
                        style="inputBox__small"
                        name="Сумма"
                    />
                </div>
                <div className="flexBtn">
                    <Button
                        onClick={createCalc}
                        name="Создать"
                        style="button_green"
                    />
                    <Button
                        onClick={closeCalculation}
                        name="Отмена"
                        style="button_red"
                    />
                </div>
            </div>
        </div>
    );
}
export { Calculations };
