function DealCard() {
    let name = "СТРАХОВАНИЕ";
    let date = "14.04.23";
    let client = "Пучков Дмитрий Юрьевич";
    let manager = "Казип Сагима";
    let discription =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nesciunt, eos architecto quia numquam alias deleniti odit optio et neque! Inventore dolores facilis, nemo quos perspiciatis laboriosam magnam soluta culpa.";
    return (
        <div className="container__dealCarde">
            <div className="card">
                <div className="lines lines_red"></div>
                <div className="content">
                    <div className="content__container">
                        <div className="content__container_top">
                            <h6>{date}</h6>
                            <h4>{name}</h4>

                            <i className="dealCardIcon_red">
                                <ion-icon name="alert-circle-outline"></ion-icon>
                            </i>
                        </div>
                        <div className="content__container content__container_mid">
                            <h4>{client}</h4>
                        </div>

                        <div className="content__container content__container_bottom">
                            <h5>
                                <span>{discription.slice(0, 50)} </span>
                                {discription.length > 50 ? (
                                    <>
                                        <span>
                                            ... <br />
                                            <div className="spanManager">
                                                <ion-icon name="person-sharp"></ion-icon>{" "}
                                                <span>{manager}</span>
                                            </div>
                                        </span>

                                        <span>{discription.slice(50)}</span>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </h5>
                        </div>
                        <div className="content__container content__container_span">
                            <div>
                                <ion-icon name="person-sharp"></ion-icon>{" "}
                                <span>{manager}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DealCard };
