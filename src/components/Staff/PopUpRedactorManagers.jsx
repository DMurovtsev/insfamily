import { editManagers } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";

function PopUpRedactorManagers({ setCurrentManagers, currentManagers, sd }) {
    const statusSelectManagers = [{ id: "true", name: "Заблокирован" }];
    function M(e) {
        {
            if (!e.target.closest(".container__redactorManagers")) {
                setCurrentManagers();
            }
        }
    }
    function redactorManagers() {
        let id = currentManagers.id;
        let formData = new FormData();
        let fioAddManagers = document.getElementById("fioAddManagers").value;

        let sdAddManagers = document.getElementById("sdAddManagers").value;
        let statusAddManagers =
            document.getElementById("statusAddManagers").value;
        formData.append("full_name", fioAddManagers);
        formData.append("department__name", sdAddManagers);
        formData.append("active_display", statusAddManagers);
        editManagers(formData, id).then((response) => {});
    }
    function deletePassword() {
        let password = "";
        let id = currentManagers.id;
        let formData = new FormData();
        formData.append("password", password);
        editManagers(formData, id).then((response) => {});
    }

    return (
        <div onClick={M} className="main__container">
            <div
                id="container__redactorManagers"
                className="container__redactorManagers"
            >
                <div className="content__redactorManagers ">
                    <Input
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.full_name}
                        setId="fioAddManagers"
                        name="ФИО менеджера"
                        style="inputBox__standart"
                    />
                    <Select
                        onChange={redactorManagers}
                        setId="sdAddManagers"
                        first={currentManagers.department__name}
                        style="inputBox__standart"
                        name="Отдел продаж"
                        options={sd}
                    />
                    <Select
                        onChange={redactorManagers}
                        setId="statusAddManagers"
                        first={currentManagers.active_display}
                        firstValue="false"
                        style="inputBox__standart"
                        name="Статус"
                        options={statusSelectManagers}
                    />
                    <Button
                        onClick={deletePassword}
                        style="button_red"
                        name="Сброс пароля"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpRedactorManagers };
