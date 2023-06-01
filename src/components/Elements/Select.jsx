import { useEffect } from "react";
import { Input } from "./Input";

function Select({
    divId,
    onClick,
    style,
    disabled,
    setId,
    options,
    name,
    onChange,
    first,
}) {
    useEffect(() => {
        let inputBox__select = document.querySelectorAll(".inputBox__select");
        inputBox__select.forEach((select) => {
            select.onclick = function () {
                select.classList.toggle("active");
            };
        });
    }, []);

    return (
        <div
            id={divId}
            onClick={onClick}
            className={
                style
                    ? `inputBox inputBox__select ${style}`
                    : "inputBox inputBox__select"
            }
        >
            <select
                onChange={onChange}
                disabled={disabled}
                id={setId}
                required="required"
            >
                {first ? <option>{first}</option> : <option></option>}

                {options
                    ? options.map((i) => <option value={i.id}>{i.name}</option>)
                    : ""}
            </select>
            <span>{name}</span>
        </div>
    );
}

export { Select };
