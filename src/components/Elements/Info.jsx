import { useEffect } from "react";

function Info() {
    useEffect(() => {}, []);

    return (
        <div className="container__flex">
            <div className="popup__Info">
                <div className="content__Info">
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <p>
                        <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    </p>
                </div>
            </div>
        </div>
    );
}
export { Info };
