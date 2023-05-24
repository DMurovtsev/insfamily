import { useEffect } from "react";
import { CheckBox } from "./CheckBox";
import { Input } from "./Input";
import { logDOM } from "@testing-library/react";

function Select_2({ options }) {
    useEffect(() => {
        if (document.getElementById("Select_2__text")) {
            document.getElementById("Select_2__text").onclick = () => {
                document.querySelector(".Select_2").classList.toggle("active");
            };
        }

        if (localStorage.getItem("funnelId")) {
            document
                .querySelectorAll(".Select_2__Option_all")
                .forEach((item) => {
                    console.log(item);
                    if (
                        item.target.attributes[0].value ==
                        localStorage.getItem("funnelId")
                    ) {
                        document.getElementById("Select_2__text").textContent =
                            item.textContent;
                    }
                });
        } else {
            document.getElementById("Select_2__text").textContent =
                document.querySelectorAll(".Select_2__Option")[0].textContent;
        }
    }, []);

    function show(i, e) {
        if (document.querySelector(".Select_2__text")) {
            document.querySelector(".Select_2__text").textContent = i;
            localStorage.setItem("funnelId", e.target.attributes[0].value);
        }
    }
    function addSalesFunnel() {}

    return (
        <div className="Select_2">
            <div id="Select_2__text" className="Select_2__text"></div>
            <div className="Select_2__Option">
                {options.results
                    ? options.results.map((i) => (
                          <div
                              className="Select_2__Option_all"
                              onClick={(e) => {
                                  show(i, e);
                              }}
                              value={i.id}
                          >
                              {i.name}
                          </div>
                      ))
                    : ""}
                <div className="input__select2">
                    <input
                        style={{ outline: "none" }}
                        type="text"
                        placeholder="Добавить воронку"
                    />
                    <span className="addVoronka">
                        <ion-icon
                            onClick={addSalesFunnel}
                            name="add-outline"
                        ></ion-icon>
                    </span>
                </div>
            </div>
        </div>
    );
}

export { Select_2 };
