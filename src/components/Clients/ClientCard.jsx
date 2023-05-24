import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { Table } from "../Elements/Table";

function ClientCard() {
    let agentArray = [
        {
            Информация: "Погода такая",
            Название: "Майские",
            Дата: "01.05.2023",
        },
        {
            Информация: "Что хочется сидеть на берегу волги",
            Название: "Близко",
            Дата: "08.05.2023",
        },
        {
            Информация: "Пить холодное пиво и жарить шашлык",
            Название: "Близко",
            Дата: "09.05.2023",
        },
    ];
    let agentArray1 = [
        {
            Информация: "Жопа в огне",
            Название: "А выпить нечего",
            Дата: "Сегодня",
        },
        {
            Информация: "Жопа в огне",
            Название: "А выпить нечего",
            Дата: "Сегодня",
        },
        {
            Информация: "Жопа в огне",
            Название: "А выпить нечего",
            Дата: "Сегодня",
        },
    ];
    let agentArray2 = [
        {
            Информация: "Герои 3",
            Название: "Надо катануть",
            Дата: "Сегодня",
        },
        {
            Информация: "Или варить борщ",
            Название: "Взять пивка",
            Дата: "Завтра",
        },
        {
            Информация: "Жопа в огне",
            Название: "А выпить нечего",
            Дата: "Сегодня",
        },
    ];

    function showDealTable() {
        document.getElementById("dealsTable").classList.remove("none");
        document.getElementById("sailsTable").classList.add("none");
        document.getElementById("policiesTable").classList.add("none");
    }
    function showSailsTable() {
        document.getElementById("sailsTable").classList.remove("none");
        document.getElementById("dealsTable").classList.add("none");
        document.getElementById("policiesTable").classList.add("none");
    }
    function showPoliciesTable() {
        document.getElementById("policiesTable").classList.remove("none");
        document.getElementById("dealsTable").classList.add("none");
        document.getElementById("sailsTable").classList.add("none");
    }
    function showPopUpNewClientCard() {
        document
            .querySelector(".container__ClientsCard")
            .classList.toggle("active");
    }

    let title = "Сделки";
    let title1 = "Продажи";
    let title2 = "Полисы в базе";
    return (
        <div className="main main__flex">
            <div id="container__ClientsCard" className="container__ClientsCard">
                <div className="content__PopUp">
                    <div className="content__PopUpClientsCard_comments"></div>

                    <div className="content__PopUp_input right">
                        <Input name="ФИО клиента" style="inputBox__standart" />
                        <Input
                            setId="addHappyBithday"
                            divId="divAddHappyBirthdayClient"
                            name="Дата рождения клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            divId="divAddPhoneClient"
                            setId="addPhoneClient"
                            name="Телефон клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            divId="divAddEmailClient"
                            setId="addEmailClient"
                            name="Email Клиента"
                            style="inputBox__standart"
                        />

                        <Input
                            name="Регион клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            name="Контактное лицо"
                            style="inputBox__standart"
                        />
                        <Input
                            divId="divAddPhoneClientFace"
                            setId="addPhoneClientFace"
                            name="Телефон КЛ"
                            style="inputBox__standart"
                        />
                        <Input
                            divId="divAddEmailClientFace"
                            setId="addEmailClientFace"
                            name="Email КЛ"
                            style="inputBox__standart"
                        />
                    </div>
                    <div className="content__PopUpClientCard">
                        <div className="content__PopUpClientCard_btn">
                            <Button onClick={showDealTable} name="Сделки" />
                            <Button onClick={showSailsTable} name="Продажи" />
                            <Button
                                onClick={showPoliciesTable}
                                name="Полисы в базе"
                            />
                        </div>
                        <div
                            className="button__close"
                            onClick={showPopUpNewClientCard}
                        >
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                        <div className="content__PopUpClientCardTable">
                            <div id="dealsTable" className="none">
                                <Table props={agentArray} title={title} />
                            </div>
                            <div id="sailsTable" className="none">
                                <Table props={agentArray1} title={title1} />
                            </div>
                            <div id="policiesTable" className="none">
                                <Table props={agentArray2} title={title2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export { ClientCard };
