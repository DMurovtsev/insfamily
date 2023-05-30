const myHost = "https://app.insfamily.ru";
const headers = {
    AUTHORIZATION: `Bearer ${localStorage.getItem("access")}`,
};

/*Логирование*/
async function Login(LoginArray) {
    let formData = new FormData();
    formData.append("username", LoginArray.login);
    formData.append("password", LoginArray.password);

    let response = await fetch(`${myHost}/j/login/`, {
        method: "POST",
        body: formData,
    });
    return await response.json();
}

// const loadNewFinPolitic = async (newFile) => {
//     const response = await fetch("http://151.248.122.207/agents/ic/", {
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newFile),
//         method: "POST",
//     });

//     return await response.json();
// };

// тестовый автовход
async function loging() {
    let formData = new FormData();
    formData.append("username", "TAdmin");
    formData.append("password", "TAdmin");

    let response = await fetch(`${myHost}/j/api/token/`, {
        // credentials: "include",
        method: "POST",
        body: formData,
    });

    return await response.json();
}
/*Обновляем access*/
async function getAccessToken() {
    let formData = new FormData();
    formData.append("refresh", localStorage.getItem("refresh"));

    let response = await fetch(`${myHost}/j/api/token/refresh/`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
}
/*Получить типы полисов*/
async function getTypiesPolicies() {
    let response = await fetch(`${myHost}/typies/l/`, {
        headers: headers,
    });
    return await response.json();
}

/*Получение клиентов*/
async function getClients() {
    let response = await fetch(`${myHost}/clients/`, {
        headers: headers,
    });
    return await response.json();
}
async function getClientsBirthday() {
    let response = await fetch(`${myHost}/clients/birthday_count/`, {
        headers: headers,
    });
    return await response.json();
}
/*Получение воронок*/
async function getFunnels() {
    let response = await fetch(`${myHost}/funnels/`, {
        headers: headers,
    });
    return await response.json();
}
/*Получение базового источника*/
async function getBaseSource() {
    let response = await fetch(`${myHost}/basesource/`, {
        headers: headers,
    });
    return await response.json();
}
/*Получение менеджеров*/
async function getManagers() {
    let response = await fetch(`${myHost}/uft/`, {
        headers: headers,
    });
    return await response.json();
}

/*Получить все этапы одной воронки*/
async function getStages(id) {
    let response = await fetch(`${myHost}/stagefunnels/?funnel=${id}`, {
        headers: headers,
    });
    return await response.json();
}
/*Изменение имени этапа*/
async function updateStageName(id, name) {
    let response = await fetch(`${myHost}/stagefunnels/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${localStorage.getItem("access")}`,
        },

        body: JSON.stringify({
            name: name,
        }),
    });
    return await response.json();
}

/*Создание этапа*/
async function createStages(id, name) {
    let formData = new FormData();
    formData.append("funnel", id);
    formData.append("name", name);
    let response = await fetch(`${myHost}/stagefunnels/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
/*Удаление этапа*/
async function deleteStage(id, selectId) {
    let formData = new FormData();
    formData.append("stage", selectId);

    let response = await fetch(`${myHost}/stagefunnels/${id}/`, {
        method: "DELETE",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
/*Получить колличество клиентов у которых ДР*/
async function getClientsBirthdayCount() {
    let response = await fetch(`${myHost}/clients/birthday_count/`, {
        method: "POST",
        headers: headers,
    });
    return await response.json();
}
async function changeStages(currentStage) {
    let formData = new FormData();
    formData.append("stage_id", currentStage.stage.id);
    formData.append("target_id", currentStage.target);
    formData.append("position", currentStage.position);
    let response = await fetch(`${myHost}/stagefunnels/sort_refresh/`, {
        method: "POST",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function createDeals(
    basesource_id,
    type_policy,
    stage_id,
    user,
    full_name,
    phone,
    email,
    birthday,
    address
) {
    let formData = new FormData();
    formData.append("basesource_id", basesource_id);
    formData.append("type_policy", type_policy);
    formData.append("stage_id", stage_id);
    formData.append("user", user);
    formData.append("full_name", full_name);
    formData.append("phone", phone);
    if (email != "") {
        formData.append("email", email);
    }
    if (birthday != "") {
        formData.append("birthday", birthday);
    }
    if (address != "") {
        formData.append("address", address);
    }
    let response = await fetch(`${myHost}/deals/`, {
        method: "POST",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function getDeals(funnel_id) {
    let response = await fetch(`${myHost}/deals/?funnel_id=${funnel_id}`, {
        headers: headers,
    });
    return await response.json();
}
async function addDiscription(discription, id) {
    let formData = new FormData();
    formData.append("description", discription);
    let response = await fetch(`${myHost}/deals/${id}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function chanageDealCard(deal, stage_id) {
    let formData = new FormData();
    formData.append("stage_funnel_id", stage_id);
    let response = await fetch(`${myHost}/deals/${deal}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
export {
    Login,
    loging,
    getAccessToken,
    getTypiesPolicies,
    getClients,
    getClientsBirthday,
    getFunnels,
    getBaseSource,
    getManagers,
    getStages,
    updateStageName,
    createStages,
    deleteStage,
    getClientsBirthdayCount,
    changeStages,
    createDeals,
    getDeals,
    addDiscription,
    chanageDealCard,
};
