import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { Table } from "../Elements/Table";
import { oneForAll } from "../../Api";

function ClientCard({ currentClient, setCurrentClient }) {
    const [clientSale, setClientSale] = useState();
    const [clientDeal, setClientDeal] = useState();
    const [clientPolicyInBase, setClientPolicyInBase] = useState();
    const [loader, setLoader] = useState(false);

    let clientSaleHeaderArray = [
        "Дата Регистрации",
        "Тип полиса",
        "Компания",
        "Канал Продаж",
        "Серия и номер",
    ];
    let clientDealHeaderArray = ["Дата создания", "Название", "Статус"];
    let clientPolicyInBaseHeaderArray = [
        "Источник",
        "Тип полиса",
        "Компания",
        "Дата окончания",
    ];

    function showSailsTable() {
        setLoader(true);
        setClientDeal();
        setClientPolicyInBase();
        const values =
            "date_registration,type__name,company__name,channel__name,number";
        let id = currentClient.id;
        oneForAll(values, "policy", undefined, `client=${id}`).then((data) => {
            setClientSale(data.results);
        });
        setLoader(false);
    }
    function showDealTable() {
        setLoader(true);
        setClientSale();
        setClientPolicyInBase();
        const values = "date_create,name,status";
        let id = currentClient.id;
        oneForAll(values, "deal", undefined, `client=${id}`).then((data) => {
            setClientDeal(data.results);
        });
        setLoader(false);
    }
    function showPoliciesTable() {
        setLoader(true);
        setClientSale();
        setClientDeal();
        const values = "base_source,type__name,company__name,date_end";
        let id = currentClient.id;
        oneForAll(values, "base_policy", undefined, `client=${id}`).then(
            (data) => {
                setClientPolicyInBase(data.results);
            }
        );
        setLoader(false);
    }

    function M(e) {
        {
            if (!e.target.closest(".container__PopUp")) {
                setCurrentClient();
            }
        }
    }
    useEffect(() => {
        setLoader(true);
        setClientDeal();
        setClientPolicyInBase();
        const values =
            "date_registration,type__name,company__name,channel__name,number";
        let id = currentClient.id;
        oneForAll(values, "policy", undefined, `client=${id}`).then((data) => {
            setClientSale(data.results);
        });
        setLoader(false);
    }, []);

    return (
        <div onClick={M} className="main__container">
            <div id="container__ClientsCard" className="container__PopUp">
                <div className="content__PopUp">
                    <div className="content__PopUpClientsCard_comments"></div>

                    <div className="content__PopUp_input right">
                        <Input
                            value={currentClient.full_name}
                            name="ФИО клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            value={currentClient.birthday}
                            setId="addHappyBithday"
                            divId="divAddHappyBirthdayClient"
                            name="Дата рождения клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            value={currentClient.phone}
                            divId="divAddPhoneClient"
                            setId="addPhoneClient"
                            name="Телефон клиента"
                            style="inputBox__standart"
                        />
                        <Input
                            value={currentClient.email}
                            divId="divAddEmailClient"
                            setId="addEmailClient"
                            name="Email Клиента"
                            style="inputBox__standart"
                        />

                        <Input
                            value={currentClient.address}
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

                    <div className="content__PopUpClientCard_btn">
                        <Button onClick={showSailsTable} name="Продажи" />
                        <Button onClick={showDealTable} name="Сделки" />
                        <Button
                            onClick={showPoliciesTable}
                            name="Полисы в базе"
                        />
                    </div>
                    <div className="content__PopUpClientCardTable">
                        {clientSale ? (
                            <Table
                                loader={loader}
                                title="Продажи"
                                props={clientSale}
                                header={clientSaleHeaderArray}
                                style="tableSaleClient"
                            />
                        ) : (
                            <></>
                        )}

                        {clientDeal ? (
                            <Table
                                loader={loader}
                                header={clientDealHeaderArray}
                                title="Сделки"
                                style="tableSaleClient"
                                props={clientDeal}
                            />
                        ) : (
                            <></>
                        )}
                        {clientPolicyInBase ? (
                            <Table
                                loader={loader}
                                header={clientPolicyInBaseHeaderArray}
                                title="Полисы в базе"
                                style="tableSaleClient"
                                props={clientPolicyInBase}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export { ClientCard };
