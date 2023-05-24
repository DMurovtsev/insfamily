function InfoPopUp(text, style) {
    const infoPopUp = document.querySelector(".popup__Info");
    const popup__Info_P = document.querySelector(".popup__Info p");
    infoPopUp.classList.add("active");
    infoPopUp.classList.add(style);
    popup__Info_P.textContent = text;
    let timeout = setTimeout(Info_PopUp_close, 3000);
    function Info_PopUp_close() {
        infoPopUp.classList.remove("active");
        infoPopUp.classList.remove(style);
    }
}
export { InfoPopUp };
