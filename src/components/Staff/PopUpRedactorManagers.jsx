import { useState } from "react";
import { editManagers } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { ResetPassword } from "./ResetPassword";

function PopUpRedactorManagers({ setCurrentManagers, currentManagers, sd }) {
    const [deletePopUp, setDeletePopUp] = useState(false);
    const statusSelectManagers = [
        { id: "true", name: "Активный" },
        { id: "false", name: "Заблокирован" },
    ];
    /*Функция редактирования полей менеджера*/
    function redactorManagers() {
        let id = currentManagers.id;
        let formData = new FormData();
        let firstNameAddManagers = document.getElementById(
            "firstNameAddManagers"
        ).value;
        let lastNameAddManagers = document.getElementById(
            "lastNameAddManagers"
        ).value;
        let middleNameAddManagers = document.getElementById(
            "middleNameAddManagers"
        ).value;
        let sdAddManagers = document.getElementById("sdAddManagers").value;
        let statusAddManagers =
            document.getElementById("statusAddManagers").value;
        formData.append("first_name", firstNameAddManagers);
        formData.append("last_name", lastNameAddManagers);
        formData.append("middle_name", middleNameAddManagers);
        formData.append("sale_department", sdAddManagers);
        formData.append("is_active", statusAddManagers);
        formData.append("user", id);
        editManagers(formData, id).then((response) => {});
    }
    function resetPassword() {
        setDeletePopUp(true);
    }
    /*Функция закрытия popUp*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setCurrentManagers();
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div
                id="content__PopUp_CreateDeal"
                className="content__PopUp_CreateDeal"
            >
                <div className="content__reazon ">
                    <Input
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.first_name}
                        setId="firstNameAddManagers"
                        name="Фамилия"
                    />
                    <Input
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.last_name}
                        setId="lastNameAddManagers"
                        name="Имя"
                    />
                    <Input
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.middle_name}
                        setId="middleNameAddManagers"
                        name="Отчество"
                    />
                    <Select
                        onChange={redactorManagers}
                        setId="sdAddManagers"
                        style="inputBox__standart"
                        name="Отдел продаж"
                        options={sd}
                        valueName={currentManagers.department__name}
                    />
                    <Select
                        onChange={redactorManagers}
                        setId="statusAddManagers"
                        style="inputBox__standart"
                        name="Статус"
                        options={statusSelectManagers}
                        valueName={currentManagers.active_display}
                    />
                    <Button
                        onClick={resetPassword}
                        style="button_red"
                        name="Сбросить пароль"
                    />
                    {/* {password ? (
                        <Input name="Новый Пароль" value={password} />
                    ) : (
                        <></>
                    )} */}
                </div>
                {deletePopUp ? (
                    <ResetPassword
                        currentManagers={currentManagers}
                        setCurrentManagers={setCurrentManagers}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
export { PopUpRedactorManagers };
