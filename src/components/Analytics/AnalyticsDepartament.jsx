import { Table } from "../Elements/Table";

function AnalyticsDepartament({ department, loader }) {
    let usersHeaderArray = ["Менеджер", "Продажи", "Сумма", "Средний чек"];
    let typiesHeaderArray = ["Тип", "Колл-во", "Сумма", "Средний чек"];
    let companiesHeaderArray = ["Компания", "Колл-во", "Сумма", "Средний чек"];
    return (
        <div className="tableAnalytics">
            <Table
                loader={loader}
                header={usersHeaderArray}
                title="Менеджеры"
                props={department.users}
            />
            <Table
                loader={loader}
                header={companiesHeaderArray}
                title="Компании"
                props={department.companies}
            />
            <Table
                loader={loader}
                header={typiesHeaderArray}
                title="Тип полиса"
                props={department.typies}
            />
        </div>
    );
}
export { AnalyticsDepartament };
