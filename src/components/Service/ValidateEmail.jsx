/*Валидация email*/
function ValidateEmail(e) {
    let form = e.target.parentNode;
    let email = e.target;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value.match(pattern)) {
        form.classList.remove("red_border");
    } else {
        form.classList.remove("green_border");
        form.classList.add("red_border");
    }
    if (email.value == "") {
        form.classList.remove("green_border");
        form.classList.remove("red_border");
    }
}
export { ValidateEmail };
