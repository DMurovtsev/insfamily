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
    ion_icon,
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
                <div className="watsUp">
                    {ion_icon ? <ion-icon name="logo-whatsapp"></ion-icon> : ""}
                </div>
                <div className="watsUpI">
                    {ion_icon ? <ion-icon name="call-outline"></ion-icon> : ""}
                </div>
            </span>
        </div>
    );
}

export { Input };
