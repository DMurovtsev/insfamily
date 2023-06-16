import { useEffect, useState } from "react";
import { getClientsBirthday, getManagers } from "../../Api";
import { PopUpClientsBirhday } from "./PopUpClientsBirhday";

function HappyBirthdayClients() {
    const [clientsBirhdayCount, setClientsBirhdayCount] = useState([]);
    const [managerss, setManagerss] = useState([]);
    const [clientsBirhday, setClientsBirhday] = useState();
    useEffect(() => {
        getClientsBirthday().then((data) => {
            setClientsBirhdayCount(data.clients);
        });
        getManagers().then((data) => {
            setManagerss(data);
        });
    }, []);

    if (managerss) {
        managerss.forEach((user, i) => {
            managerss[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }
    return (
        <>
            <div id="HappyBirthdayClients" className="HappyBirthdayClients">
                <ul>
                    {clientsBirhdayCount.length > 0 ? (
                        clientsBirhdayCount.map((item) => (
                            <li
                                onClick={(e) => {
                                    setClientsBirhday(
                                        Object.values(item)[0].data
                                    );
                                }}
                            >
                                {Object.keys(item)[0]}{" "}
                                <div className="clientsBirhday">
                                    {Object.values(item)[0].count}
                                </div>
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
            {clientsBirhday ? (
                <PopUpClientsBirhday
                    clientsBirhday={clientsBirhday}
                    setClientsBirhday={setClientsBirhday}
                    managerss={managerss}
                />
            ) : (
                <> </>
            )}
        </>
    );
}

export { HappyBirthdayClients };
