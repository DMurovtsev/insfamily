function DealCard({ props, setDeal }) {
    let discription = props.description;
    let user = props.user;
    let manager = {
        name: `${user.first_name} ${user.last_name}`,
    };
    let clientName = props.policy.policyholder;
    let clients = {
        client: `${clientName.first_name} ${clientName.last_name}`,
    };
    function dragStartDeal(e) {
        document.querySelector(".main__bottom").classList.remove("none");
        e.target.classList.add("selected");
        let id = e.target.id;
        setDeal(id);
    }

    function dragEndDeal(e) {
        e.preventDefault();
        document.querySelector(".main__bottom").classList.add("none");
        e.target.classList.remove("selected");
    }
    function dropDeal(e) {
        // let dealColumn = e.target.closest(".dealColumn");
        // console.log(dealColumn);
        // let index = Array.from(
        //     document.querySelectorAll(".dealColumn")
        // ).indexOf(dealColumn);
        // let stageId = document.querySelectorAll(
        //     ".containerFlex__header_single"
        // )[index].dataset.id;
        // chanageDealCard(deal, stageId).then((response) => {
        //     getDeals(1).then((data) => {
        //         setDeals(data);
        //     });
        // });
    }
    function enterDeal(e) {}
    function dragOverDeal(e) {
        e.preventDefault();
    }

    return (
        <div
            data-stageId={props.stage_funnel.id}
            className="container__dealCarde"
        >
            <div
                draggable
                id={props.id}
                className="card"
                onDragStart={(e) => {
                    dragStartDeal(e);
                }}
                onDragEnd={(e) => {
                    dragEndDeal(e);
                }}
                onDragOver={(e) => {
                    dragOverDeal(e);
                }}
                onDrop={dropDeal}
                onDragEnter={(e) => {
                    enterDeal(e);
                }}
            >
                {props.label === "new" ? (
                    <div className="lines lines_red"></div>
                ) : (
                    ""
                )}
                {props.label === "no_call" ? (
                    <div className="lines lines_blue"></div>
                ) : (
                    ""
                )}
                {props.label === "processed" ? (
                    <div className="lines lines"></div>
                ) : (
                    ""
                )}

                <div className="content">
                    <div className="content__container">
                        <div className="content__container_top">
                            <h6>{props.date_create}</h6>
                            <h4>{props.name}</h4>
                            {props.label === "new" ? (
                                <i className="dealCardIcon_red">
                                    <ion-icon name="alert-circle-outline"></ion-icon>
                                </i>
                            ) : (
                                ""
                            )}
                            {props.label === "no_call" ? (
                                <i className="dealCardIcon_blue">
                                    <ion-icon name="alert-circle-outline"></ion-icon>
                                </i>
                            ) : (
                                ""
                            )}
                            {props.label === "processed" ? (
                                <i className="dealCardIcon">
                                    <ion-icon name="alert-circle-outline"></ion-icon>
                                </i>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="content__container content__container_mid">
                            <h4>{clients.client}</h4>
                        </div>
                        {discription === "" ? (
                            ""
                        ) : (
                            <div className="content__container content__container_bottom">
                                <h5>
                                    {discription ? (
                                        <span>{discription.slice(0, 50)} </span>
                                    ) : (
                                        ""
                                    )}

                                    {discription ? (
                                        <>
                                            <span>
                                                ... <br />
                                                <div className="spanManager">
                                                    <ion-icon name="person-sharp"></ion-icon>{" "}
                                                    <span>{manager.name}</span>
                                                </div>
                                            </span>

                                            <span>
                                                {discription
                                                    ? discription.slice(50)
                                                    : ""}
                                            </span>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </h5>
                            </div>
                        )}

                        <div className="content__container content__container_span">
                            <div>
                                <ion-icon name="person-sharp"></ion-icon>{" "}
                                <span>{manager.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DealCard };
