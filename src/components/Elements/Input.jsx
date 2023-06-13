function Input({
    logo,
    name,
    style,
    value,
    setId,
    onInput,
    divId,
    type,
    step,
    onBlur,
    onKeyDown,
    none,
}) {
    return (
        <div
            id={divId}
            className={
                style
                    ? `inputBox inputBox__standart ${style}`
                    : "inputBox inputBox__standart"
            }
        >
            <input
                style={{ pointerEvents: none }}
                defaultValue={value}
                onInput={onInput}
                onBlur={onBlur}
                id={setId}
                type={type ? type : "text"}
                required
                step={step ? step : ""}
                onKeyDown={onKeyDown}
            />
            <span>
                {logo}
                {name}
            </span>
        </div>
    );
}

export { Input };
