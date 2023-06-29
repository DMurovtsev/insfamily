import { useEffect, useState } from "react";
import { getAnalytics, getFilterAnalytics } from "../Api";
import { Table } from "../components/Elements/Table";
import { AnalyticsDepartament } from "../components/Analytics/AnalyticsDepartament";
import { Input } from "../components/Elements/Input";

function Analytics() {
    const [analytics, setAnalytics] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getAnalytics().then((data) => {
            setAnalytics(data);
        });

        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[5].classList.add("hovered");
    }, []);

    /*Фильтрация аналиттики по селектам*/
    function filtrClientsSelects() {
        setLoader(true);

        let input__DepartmentWith = document.getElementById(
            "input__DepartmentWith"
        );
        let input__DepartmentBefore = document.getElementById(
            "input__DepartmentBefore"
        );

        let link = "";

        if (input__DepartmentWith && input__DepartmentWith.value != "") {
            link = link + `&date_start=${input__DepartmentWith.value}`;
        }
        if (input__DepartmentBefore && input__DepartmentBefore.value != "") {
            link = link + `&date_end=${input__DepartmentBefore.value}`;
        }
        if (link != "") {
            link = link.slice(1);
        }

        getFilterAnalytics(link).then((data) => {
            setAnalytics(data);
            setLoader(false);
        });
    }
    /*Валидация даты*/
    function checkDate(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (2 < e.target.value.length && e.target.value.length < 5) {
            e.target.value =
                e.target.value.slice(0, 2) + "." + e.target.value.slice(2, 4);
        } else if (e.target.value.length > 4) {
            e.target.value =
                e.target.value.slice(0, 2) +
                "." +
                e.target.value.slice(2, 4) +
                "." +
                e.target.value.slice(4, 8);
            if (e.target.value.length == 10) {
                let newDate = new Date(
                    e.target.value.slice(6, 10),
                    Number(e.target.value.slice(3, 5) - 1),
                    e.target.value.slice(0, 2)
                );
            }
        }
    }

    return (
        <div className="main">
            <div className="input__Department">
                <Input
                    onInput={checkDate}
                    setId="input__DepartmentWith"
                    style="input__small"
                    name="Дата с"
                    onBlur={filtrClientsSelects}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrClientsSelects();
                        }
                    }}
                />
                <Input
                    onInput={checkDate}
                    setId="input__DepartmentBefore"
                    style="input__small"
                    name="Дата по"
                    onBlur={filtrClientsSelects}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrClientsSelects();
                        }
                    }}
                />
            </div>
            <div className="container__kasco">
                {analytics.map((data) => (
                    <div className="table__department">
                        <h2 className="hdepatments">
                            {data.sales_departments}
                        </h2>
                        <h3 className="hdepatments">{data.sum}&#8381;</h3>
                        <AnalyticsDepartament
                            loader={loader}
                            department={data}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export { Analytics };
