import { useContext } from "react";
import { Select } from "../Elements/Select";
import { CustomContext } from "../Service/Context";

function PopUpClientsBirhday({ clientsBirhday, managerss, setClientsBirhday }) {
    const { admin } = useContext(CustomContext);
    function closeHB(e) {
        if (!e.target.closest(".table")) {
            setClientsBirhday();
        }
    }
    function whatsUpHB(full_name, phone, managers) {
        let name = full_name.split(" ").slice(1).join(" ");
        let manager = managers.split(" ")[2];
        console.log(name);
        console.log(phone);
        console.log(manager);
        window.open(
            `https://web.whatsapp.com/send?phone=7${phone}&text=${name}, Добрый день! Поздравляю Вас с Днём Рождения! Пусть сбудется всё, что входит в Ваши планы. Жизнь открывает новые горизонты, а каждый день приносит положительные эмоции и яркие впечатления. Крепкого здоровья Вам и Вашим близким. С уважением, ${manager}, страховой центр InsFamily.,
                "_blank"`
        );
    }
    return (
        <div onClick={closeHB} className="PopUpClientsBirhday">
            <div className="PopUpClientsBirhday PopUpClientsBirhday__container">
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th>ФИО клиента</th>
                            <th>Дата рождения</th>
                            <th>Телефон</th>
                            <th>Менеджер</th>
                            {admin ? <th>Ответственный</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {clientsBirhday ? (
                            clientsBirhday.map((client) => (
                                <tr>
                                    <td>{client.full_name}</td>
                                    <td>{client.birthday}</td>
                                    <td
                                        onClick={() => {
                                            whatsUpHB(
                                                client.full_name,
                                                client.phone,
                                                client.manager
                                            );
                                        }}
                                    >
                                        {client.phone}
                                    </td>
                                    <td>{client.manager}</td>
                                    {admin ? (
                                        <td>
                                            <Select options={managerss} />
                                        </td>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export { PopUpClientsBirhday };
