import { useState } from "react";
import { chanageDealCard } from "../../Api";

function DealCard({ props, setDeal, deal }) {
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
        e.target.classList.add("selected");
    }

    function dragEndDeal(e) {
        e.target.classList.remove("selected");
        let id = e.target.id;
        setDeal(id);
    }
    function dropDeal(e) {
        console.log(e);
        let stage_id = e.target.closest(".container__dealCarde");
        console.log(deal);

        chanageDealCard(deal, stage_id).then((response) => {});
    }
    function dragOverDeal(e) {}

    return (
        <div
            data-stageId={props.stage_funnel.id}
            className="container__dealCarde"
        >
            <div
                draggable
                id={props.id}
                className="card"
                onDragLeave={(e) => {
                    // dragLeaveDeal(e);
                }}
                onDragStart={(e) => {
                    dragStartDeal(e);
                }}
                onDragEnd={(e) => {
                    dragEndDeal(e);
                }}
                onDragOver={(e) => {
                    dragOverDeal(e);
                }}
                onDrop={(e) => {
                    dropDeal(e);
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
