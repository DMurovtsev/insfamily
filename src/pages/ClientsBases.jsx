import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Link } from "react-router-dom";
import { Table } from "../components/Elements/Table";

function ClientsBases() {
    return (
        <div>
            <div className="container__header">
                <Link to="/Clients">
                    <Button name="Клиенты" />
                </Link>

                <Select
                    name="Фильтр по базе полисов"
                    style="inputBox__select_large"
                />
                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск по базе полисов"
                    style="inputBox__standart"
                />
                <Button name="Добавить полис" />
            </div>
            {/* <Table /> */}
        </div>
    );
}

export { ClientsBases };
