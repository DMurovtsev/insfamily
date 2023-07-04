import { useState } from "react";
import { resetPassword } from "../../Api";
import { Button } from "../Elements/Button";

function ResetPassword({ currentManagers, setCurrentManagers }) {
    const [password, setPassword] = useState();
    /*Функция закрытия popUp*/
    function closePopUp() {
        setCurrentManagers();
    }
    /*Функция сброса пороля менеджера*/
    function deletePassword() {
        let formData = new FormData();
        let id = currentManagers.id;
        formData.append("user", id);
        resetPassword(formData).then((response) => {
            setPassword(response);
        });
    }
    return (
        <div className="main__container">
            <div
                id="content__PopUp_CreateDeal"
                className="content__PopUp_CreateDeal"
            >
                <div>
                    <h2 style={{ color: "red" }}>
                        <ion-icon name="warning-outline"></ion-icon>ТОЧНО
                        СБРОСИТЬ ПАРОЛЬ?
                        <ion-icon name="warning-outline"></ion-icon>
                    </h2>
                    <Button onClick={closePopUp} name="Нет" />
                    <Button
                        style="button_red"
                        onClick={deletePassword}
                        name="Да"
                    />
                </div>
            </div>
        </div>
    );
}
export { ResetPassword };
