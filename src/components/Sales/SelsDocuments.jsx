import { Link } from "react-router-dom";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { Select } from "../Elements/Select";

function SelsDocuments({ documents }) {
    const fileInput = document.getElementById("inputFileSels");
    if (fileInput) {
        fileInput.addEventListener("change", (event) => {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const fileSizeBytes = file.size;
                const fileSizeMB = fileSizeBytes / 1024 ** 2;
                const fileSizeMBSlice = fileSizeMB.toFixed(2);
                const listItem = document.createElement("div");
                listItem.innerHTML = `${fileName} (${fileSizeMBSlice} mb)`;
            }
        });
    }
    function viewDocs(link) {
        window.open(link, "_blank");
    }

    return (
        <div className="container__SelsDocuments">
            <div className="content__SelsDocuments">
                <h3>Документы</h3>
                {documents ? (
                    documents.map((k) => (
                        <li
                            onClick={() => {
                                viewDocs(k.file);
                            }}
                            className="liSales"
                        >
                            {k.name} {k.date_add}
                        </li>
                    ))
                ) : (
                    <></>
                )}

                <InputFile setId="inputFileSels" name="Загрузить документы" />
            </div>
        </div>
    );
}
export { SelsDocuments };
