import { regManagers } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpRegManagers({ setUser, sd }) {
    function addManagers() {
        let formData = new FormData();
        let lastNameAddManagerId = document.getElementById(
            "lastNameAddManagerId"
        ).value;
        let firstNameAddManagerId = document.getElementById(
            "firstNameAddManagerId"
        ).value;
        let middleNameAddManagerId = document.getElementById(
            "middleNameAddManagerId"
        ).value;
        let loginAddManagerId =
            document.getElementById("loginAddManagerId").value;
        let passworAddManagerdId = document.getElementById(
            "passworAddManagerdId"
        ).value;
        let sdAddManagersId = document.getElementById("sdAddManagersId").value;
        formData.append("last_name", lastNameAddManagerId);
        formData.append("first_name", firstNameAddManagerId);
        formData.append("middle_name", middleNameAddManagerId);
        formData.append("username", loginAddManagerId);
        formData.append("password", passworAddManagerdId);
        formData.append("sd", sdAddManagersId);
        regManagers(formData).then((response) => {
            setUser(false);
            if (response.error_name) {
                InfoPopUp(response.error_name, "popup__Info_red");
            } else {
                InfoPopUp(
                    `${loginAddManagerId} успешно добавлен`,
                    "popup__Info_green"
                );
            }
        });
    }
    function M(e) {
        {
            if (!e.target.closest(".addManagers__container")) {
                setUser(false);
            }
        }
    }

    return (
        <div onClick={M} className="main__container">
            <div className="addManagers__container">
                <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                    Добавление Менеджера
                </h3>
                <Input
                    style="input__medium"
                    setId="lastNameAddManagerId"
                    name="Фамилия"
                />
                <Input
                    style="input__medium"
                    setId="firstNameAddManagerId"
                    name="Имя"
                />
                <Input
                    style="input__medium"
                    setId="middleNameAddManagerId"
                    name="Отчество"
                />
                <Input
                    style="input__medium"
                    setId="loginAddManagerId"
                    name="Логин"
                />
                <Input
                    style="input__medium"
                    setId="passworAddManagerdId"
                    name="Пароль"
                />
                <Select
                    style="inputBox__select_largest"
                    setId="sdAddManagersId"
                    options={sd}
                    name="Отдел продаж"
                />
                <Button
                    style="button_green"
                    onClick={addManagers}
                    name="Добавить"
                />
            </div>
        </div>
    );
}
export { PopUpRegManagers };