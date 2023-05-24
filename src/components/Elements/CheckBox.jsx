function CheckBox({ style }) {
    return (
        <label className={style ? `label ${style}` : "label"}>
            <input type="checkbox" name="" />
            <span className="btn"></span>
            <i className="fa">
                <ion-icon name="checkmark-circle-sharp"></ion-icon>
            </i>
        </label>
    );
}

export { CheckBox };
