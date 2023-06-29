import { useEffect, useState } from "react";
import { ClientCard } from "../components/Clients/ClientCard";
import { Button } from "../components/Elements/Button";
import { getSellsDepartment, oneForAll } from "../Api";
import { Input } from "../components/Elements/Input";
import { Select } from "../components/Elements/Select";
import { Table } from "../components/Elements/Table";

function Staff() {
    const [loader, setLoader] = useState([]);
    const [managers, setManagers] = useState([]);
    const [sd, setSd] = useState([]);
    const [currentPageStuff, setCurrentPageStuff] = useState();
    const [loading, setLoading] = useState(false);
    const values = "full_name,department__name,active_display,id";
    let prevScrollTop = 0;
    let managersHeaderArray = ["ФИО", "Отдел продаж", "Статус", "ID"];
    useEffect(() => {
        filtrManagersSelects();
        getSellsDepartment().then((data) => {
            setSd(data);
        });
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });

        list[9].classList.add("hovered");
    }, []);

    function filtrManagersSelects() {
        setLoader(true);
        let stuffSdSelect = document.getElementById("stuffSdSelect");
        let link = "";
        if (stuffSdSelect && stuffSdSelect.value != "") {
            link = link + `&sales_department=${stuffSdSelect.value}`;
        }
        oneForAll(values, "user", undefined, link).then((data) => {
            setManagers(data.results);
            if (data.next_page) {
                setCurrentPageStuff(data.next_page);
            } else {
                setCurrentPageStuff();
            }
            setLoader(false);
        });
    }
    const scrollHandler = (
        e,
        currentPageStuff,
        setCurrentPageStuff,
        loading,
        setLoading,
        setManagers
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageStuff &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageStuff;

            oneForAll(undefined, undefined, next, undefined).then((data) => {
                setManagers((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPageStuff(data.next_page);
                } else {
                    setCurrentPageStuff();
                }
                setLoading(false);
            });
        }
    };

    return (
        <div className="main">
            <Select
                onChange={filtrManagersSelects}
                setId="stuffSdSelect"
                options={sd}
                style="input__small"
                name="Отдел продаж"
            />
            <div>
                <Table
                    header={managersHeaderArray}
                    loader={loader}
                    scrollHandler={scrollHandler}
                    setLoading={setLoading}
                    currentPage={currentPageStuff}
                    setCurrentPage={setCurrentPageStuff}
                    title="Менеджеры"
                    setData={setManagers}
                    style="container__table_basepolicy"
                    props={managers}
                    loading={loading}
                />
            </div>
        </div>
    );
}
export { Staff };
