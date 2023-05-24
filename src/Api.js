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
async function changeStages(startId, endId) {
    let formData = new FormData();
    formData.append("stage_1", startId);
    formData.append("stage_2", endId);

    let response = await fetch(`${myHost}/stagefunnels/sort_refresh/`, {
        body: formData,
        method: "POST",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
export {
    changeStages,
    Login,
    loging,
    getAccessToken,
    createStages,
    getTypiesPolicies,
    getStages,
    getClients,
    getClientsBirthday,
    getClientsBirthdayCount,
    updateStageName,
    getFunnels,
    deleteStage,
};
