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
                onInput={onInput}
                onBlur={onBlur}
                id={setId}
                type={type ? type : "text"}
                required
                value={value}
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
