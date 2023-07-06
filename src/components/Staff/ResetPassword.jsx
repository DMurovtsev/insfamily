import { resetPassword } from "../../Api";
import { Button } from "../Elements/Button";

function ResetPassword({ currentManagers, setDeletePopUp, setPassword }) {
    /*Функция закрытия popUp*/
    function closePopUp() {
        setDeletePopUp();
    }
    /*Функция сброса пороля менеджера*/
    function deletePassword() {
        let formData = new FormData();
        let id = currentManagers.id;
        formData.append("user", id);
        resetPassword(formData).then((response) => {
            setDeletePopUp();
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
