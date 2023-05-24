import { updateStageName, changeStages } from "../../Api";
import { Button } from "../Elements/Button";
import { CustomContext } from "../Service/Context";
import { useContext, useEffect, useRef, useState } from "react";
import { DeleteStage } from "./DeleteStage";

function Stage({ props, setId, setStage }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.stage.name);

    useEffect(() => {
        if (document.getElementById("inputUpdateStage")) {
            document.getElementById("inputUpdateStage").focus();
        }
    }, [editing]);

    /*Редактирование этапа и фокус на input*/
    const handleEditClick = (e) => {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
        setEditing(true);
        if (document.getElementById("inputUpdateStage")) {
            document.getElementById("inputUpdateStage").focus();
        }
    };
    const hadleDeleteStage = function (e, setId) {
        let idDelete = props.stage.id;
        setId(idDelete);
        if (document.querySelector(".contenerDeleteStage")) {
            document
                .querySelector(".contenerDeleteStage")
                .classList.toggle("active");
        }
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            setEditing(false);
        }
        if (event.keyCode === 13) {
            handleNameSave();
        }
    };

    function showEditStage(e) {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
        if (e.keyCode === 27) {
            setEditing(false);
        }
    }
    function closeRedactorStage(e) {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
    }
    /*Сохранение измененного этапа */
    const handleNameSave = () => {
        let newId = props.stage.id;
        let newName = document.querySelector(".inputReadactorStage").value;
        updateStageName(newId, newName).then((response) => {
            setStage(response);
        });
        setEditing(false);
    };
    const admin = useContext(CustomContext);
    const [sort, setSort] = useState();
    const [stageId, setStageId] = useState();
    const [currentStage, setCurrentStage] = useState();
    function dragStart(e) {
        setCurrentStage(props.stage);
        e.target.classList.add("selected");
        setStageId(props.stage.id);
        setSort(props.stage.sort);
    }
    function dragEnd(e) {
        e.target.classList.remove("selected");
    }
    /*Для того чтобы элементы раздвигались*/
    function dragOver(e, currentStage) {
        e.preventDefault();
        if (
            e.currentTarget.classList.contains(
                "containerFlex__header_single"
            ) &&
            e.currentTarget.dataset.id != stageId
        ) {
            console.log(currentStage);

            // console.log(e.currentTarget.dataset.sort);
            // console.log(sort);

            if (e.currentTarget.dataset.sort > sort) {
                e.currentTarget.classList.add("dragLeft");
            } else {
                e.currentTarget.classList.add("dragRight");
            }
        }
    }
    function drop(e) {
        let endId = e.currentTarget.dataset.id;

        // console.log(sort);
    }

    return (
        <div
            data-id={props.stage.id}
            data-sort={props.stage.sort}
            draggable
            className="containerFlex__header_single "
            onDragStart={(e) => {
                dragStart(e);
            }}
            onDragEnd={dragEnd}
            onDragOver={(e) => {
                dragOver(e, currentStage);
            }}
            onDrop={drop}
        >
            <div className={admin ? "containerStage" : "containerStageManager"}>
                <div className="redactorStageDiv">
                    <Button
                        onClick={(e) => {
                            handleEditClick(e);
                        }}
                        name="Редактировать"
                    />

                    <Button
                        setId="buttonDeleteStage"
                        name="Удалить"
                        onClick={(e) => {
                            hadleDeleteStage(e, setId);
                        }}
                    />
                    <span className="closeRedactorStage">
                        <ion-icon
                            onClick={(e) => {
                                closeRedactorStage(e);
                            }}
                            name="close-outline"
                        ></ion-icon>
                    </span>
                </div>
                <div className="containerStageContent containerStageManagerContent">
                    {admin ? (
                        <span className={editing ? "none" : "redactorStage"}>
                            <ion-icon
                                onClick={(e) => {
                                    showEditStage(e);
                                }}
                                name="create-outline"
                            ></ion-icon>
                        </span>
                    ) : (
                        ""
                    )}

                    {editing ? (
                        <input
                            id="inputUpdateStage"
                            onKeyDown={handleKeyDown}
                            className="inputReadactorStage"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            style={{ outline: "none" }}
                        />
                    ) : (
                        <h3>{props.stage.name}</h3>
                    )}

                    <div
                        className={editing ? "none" : "containerStage_quantity"}
                    >
                        <h5>{props.count}</h5>
                        <h5>{props.sum}&#8381;</h5>
                    </div>
                    {editing ? (
                        <div className="smallBtn" onClick={handleNameSave}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
export { Stage };
