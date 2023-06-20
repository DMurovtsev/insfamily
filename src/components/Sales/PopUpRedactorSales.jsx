import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";

function PopUpRedactorSales({ managers, insCompany, channel, typePolicies }) {
    let selectOptionsTypeSales = [
        { id: "NewBisnes", name: "Новый бизнес" },
        { id: "Prolongation", name: "Пролонгация" },
        { id: "Transition", name: "Переход" },
        { id: "Addendum", name: "Аддендум" },
        { id: "NextInstallment", name: "Очередной взнос" },
    ];
    function M(e) {
        {
            if (!e.target.closest(".container__PopUp")) {
            }
        }
    }
    return (
        <div onClick={M} className="popUp__body">
            <div id="container__PopUp" className="container__PopUp ">
                <div className="content__PopUp content__PopUp_Sales">
                    <Select
                        style="inputBox__standart_popUp"
                        name="Тип продажи"
                        options={selectOptionsTypeSales}
                    />
                    <Select
                        style="inputBox__standart_popUp"
                        name="Тип полиса"
                        options={typePolicies}
                    />
                    <Input name="Серия и номер" />
                    <Select
                        style="inputBox__standart_popUp"
                        name="Страховая компания"
                        options={insCompany}
                    />
                    <Select
                        style="inputBox__standart_popUp"
                        name="Канал продаж"
                        options={channel}
                    />
                    <Input name="Премия" />
                    <Input name="Вход. КВ %" />
                    <Input name="Вход. КВ РУБ." />
                    <Input name="Клиент" />
                    <Select
                        style="inputBox__standart_popUp"
                        name="Менеджер"
                        options={managers}
                    />
                    <Input name="Оформлен" />
                    <Input name="Начало действия" />
                    <Input name="Окончание действия" />
                    <Button name="Сохранить" />
                </div>
            </div>
            //{" "}
        </div>
    );
}
export { PopUpRedactorSales };
