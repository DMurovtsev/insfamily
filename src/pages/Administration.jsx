import { useEffect, useState } from "react";
import { Input } from "../components/Elements/Input";
import {
    addBanks,
    addChannels,
    addCompanies,
    addSd,
    addtypePolicys,
    getBanks,
    getChannels,
    getCompaniesL,
    getSellsDepartment,
    getTypiesPolicies,
    redactorBanks,
    redactorChannels,
    redactorCompanies,
    redactorSd,
    redactortypePolicys,
} from "../Api";

function Administration() {
    const [type, setType] = useState([]);
    const [channels, setChannels] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [bank, setBank] = useState([]);
    const [sd, setSd] = useState([]);
    useEffect(() => {
        getTypiesPolicies().then((data) => {
            setType(data);
        });
        getChannels().then((data) => {
            setChannels(data);
        });
        getCompaniesL().then((data) => {
            setCompanies(data);
        });
        getBanks().then((data) => {
            setBank(data);
        });
        getSellsDepartment().then((data) => {
            setSd(data);
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        // list[10].classList.add("hovered");
    }, []);
    function addType() {
        let name = document.getElementById("addTypeAdministration").value;
        addtypePolicys(name).then((response) => {});
    }
    function addChannel() {
        let name = document.getElementById("addChannelsAdministration").value;
        addChannels(name).then((response) => {});
    }
    function addCompanie() {
        let name = document.getElementById("addCompanieAdministration").value;
        addCompanies(name).then((response) => {});
    }
    function addBank() {
        let name = document.getElementById("addBankAdministration").value;
        addBanks(name).then((response) => {});
    }
    function addSD() {
        let name = document.getElementById("addSdAdministration").value;
        addSd(name).then((response) => {});
    }
    function editType(e) {
        let name = e.target.value;
        redactortypePolicys(name).then((response) => {});
    }
    function editChannel(e) {
        let name = e.target.value;
        redactorChannels(name).then((response) => {});
    }
    function editCompanie(e) {
        let name = e.target.value;
        redactorCompanies(name).then((response) => {});
    }
    function editBank(e) {
        let name = e.target.value;
        redactorBanks(name).then((response) => {});
    }
    function editSD(e) {
        let name = e.target.value;
        redactorSd(name).then((response) => {});
    }

    return (
        <div className="main">
            <>
                <div className="administration__container">
                    <div className="administration__content">
                        <h3 className="administrationH">Тип полиса</h3>

                        {type ? (
                            type.map((t) => (
                                <Input
                                    onBlur={editType}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editType(e);
                                        }
                                    }}
                                    value={t.name}
                                    name="Тип полиса"
                                    style="input__small "
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addTypeAdministration"
                            style="input__small"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addType();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        {" "}
                        <h3 className="administrationH">Канал продаж</h3>
                        {channels ? (
                            channels.map((c) => (
                                <Input
                                    onBlur={editChannel}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editChannel(e);
                                        }
                                    }}
                                    value={c.name}
                                    name="Канал продаж"
                                    style="input__small"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addChannelsAdministration"
                            style="input__small"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addChannel();
                                }
                            }}
                        />
                    </div>

                    <div className="administration__content">
                        {" "}
                        <h3 className="administrationH">Компания</h3>
                        {companies ? (
                            companies.map((k) => (
                                <Input
                                    onBlur={editCompanie}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editCompanie(e);
                                        }
                                    }}
                                    value={k.name}
                                    name="Компания"
                                    style="input__small"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addCompanieAdministration"
                            style="input__small"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addCompanie();
                                }
                            }}
                        />
                    </div>

                    <div className="administration__content">
                        <h3 className="administrationH">Банк</h3>

                        {bank ? (
                            bank.map((b) => (
                                <Input
                                    onBlur={editBank}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editBank(e);
                                        }
                                    }}
                                    value={b.name}
                                    name="Банк"
                                    style="input__small"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addBankAdministration"
                            style="input__small"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addBank();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        <h3 className="administrationH">Отдел продаж</h3>

                        {sd ? (
                            sd.map((s) => (
                                <Input
                                    onBlur={editSD}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editSD(e);
                                        }
                                    }}
                                    value={s.name}
                                    name="Отдел продаж"
                                    style="input__small "
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addSdAdministration"
                            style="input__small"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addSD();
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}
export { Administration };
