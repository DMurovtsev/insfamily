/*Валидация телефона*/
function ValidatePhone(e) {
    let form = e.target.parentNode;
    let phone = e.target;
    let pattern = /^((\9)+([0-9]){9})$/;
    let regex = /[^\d]/g;
    let index = phone.value.indexOf("9");
    if (index != -1) {
        phone.value = phone.value.slice(index);
    } else {
        phone.value = "";
    }
    phone.value = phone.value.replace(regex, "");
    if (phone.value.length > 10) {
        phone.value = phone.value.slice(0, 10);
    }
    if (phone.value.match(pattern)) {
        form.classList.remove("red_border");
    } else {
        form.classList.remove("green_border");
        form.classList.add("red_border");
    }
    if (phone.value == "") {
        form.classList.remove("green_border");
        form.classList.remove("red_border");
    }
}
export { ValidatePhone };
