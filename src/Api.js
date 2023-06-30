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
async function getClients(values = null) {
    let link = values
        ? `${myHost}/clients/?values=${values}`
        : `${myHost}/clients/`;
    let response = await fetch(link, {
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
    address,
    brand,
    number,
    vin,
    year,
    ipoteca,
    bank,
    risk,
    remainder
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
    if (brand != "") {
        formData.append("brand", brand);
    }
    if (number != "") {
        formData.append("number", number);
    }
    if (vin != "") {
        formData.append("vin", vin);
    }
    if (year != "") {
        formData.append("year", year);
    }
    if (ipoteca != "") {
        formData.append("ipoteca", ipoteca);
    }
    if (bank != "") {
        formData.append("bank", bank);
    }
    if (risk != "") {
        formData.append("obj", risk);
    }
    if (remainder != "") {
        formData.append("remainder", remainder);
    }
    let response = await fetch(`${myHost}/deals/`, {
        method: "POST",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function getDeals(funnel_id, search = "") {
    let url = `${myHost}/deals/?funnel_id=${funnel_id}&status=in_work`;
    if (search != "") {
        url = url + `&search=${search}`;
    }
    let response = await fetch(url, {
        headers: headers,
    });
    return await response.json();
}
async function addDiscription(description, id) {
    let formData = new FormData();
    formData.append("description", description);
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
async function chanageStatusDealCard(deal, status_deal) {
    let formData = new FormData();
    formData.append("status", status_deal);
    let response = await fetch(`${myHost}/deals/${deal}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function redactorPopUpDeal(key, value, id) {
    let formData = new FormData();
    formData.append(key, value);
    let response = await fetch(`${myHost}/deals/${id}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
/*Добавление воронки*/
async function addFunnels(funnelName) {
    let formData = new FormData();
    formData.append("name", funnelName);
    let response = await fetch(`${myHost}/funnels/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function chanageLabelDealCard(deal, label_deal) {
    let formData = new FormData();
    formData.append("label", label_deal);
    let response = await fetch(`${myHost}/deals/${deal}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function addComments(deal_id, comment_content) {
    let formData = new FormData();
    formData.append("deal", deal_id);
    formData.append("content", comment_content);
    let response = await fetch(`${myHost}/comments/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function getCompaniesL() {
    let response = await fetch(`${myHost}/companies/l/`, {
        headers: headers,
    });
    return await response.json();
}
async function getReasonForFailure() {
    let response = await fetch(`${myHost}/reason_for_failure/`, {
        headers: headers,
    });
    return await response.json();
}
async function chooseReasonForFailure(deal, reason_for_failure) {
    let formData = new FormData();
    formData.append("reason_for_failure_id", reason_for_failure);
    let response = await fetch(`${myHost}/deals/${deal}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function addCalc(deal, companies_option, sum) {
    let formData = new FormData();
    formData.append("deal_id", deal);
    formData.append("company_id", companies_option);
    formData.append("value", sum);
    let response = await fetch(`${myHost}/calc/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function getCalc(link = "") {
    let response = await fetch(`${myHost}/calc/${link}`, {
        headers: headers,
    });
    return await response.json();
}
async function deleteCalc(id) {
    return await fetch(`${myHost}/calc/${id}/`, {
        method: "DELETE",
        headers: headers,
    });
}
async function getSD() {
    let response = await fetch(`${myHost}/sd/`, {
        headers: headers,
    });
    return await response.json();
}
async function getScrollDeals(currentPage) {
    let response = await fetch(`${myHost}/deals/${currentPage}`, {
        headers: headers,
    });
    return await response.json();
}
async function getFilterDeals(funnel_id, link) {
    let response = await fetch(
        `${myHost}/deals/?funnel_id=${funnel_id}${link}`,
        {
            headers: headers,
        }
    );
    return await response.json();
}
async function globalSearch(search) {
    let url = `${myHost}/basepolicies/search/?search=${search}`;
    let response = await fetch(url, {
        headers: headers,
    });
    return await response.json();
}
async function getScrollSearch(currentPage) {
    let response = await fetch(`${myHost}${currentPage}`, {
        headers: headers,
    });
    return await response.json();
}
// async function createCar(brand, number, vin, year) {
//     let formData = new FormData();
//     formData.append("brand", brand);
//     formData.append("number", number);
//     formData.append("vin", vin);
//     formData.append("year", year);
//     let response = await fetch(`${myHost}/cars/`, {
//         method: "POST",
//         body: formData,
//         headers: headers,
//     });
//     return await response.json();
// }

async function getBanks() {
    let response = await fetch(`${myHost}/banks/l/`, {
        headers: headers,
    });
    return await response.json();
}

async function redactorPopUpDealCars(carsId, key, value) {
    let formData = new FormData();
    formData.append(key, value);
    let response = await fetch(`${myHost}/cars/${carsId}/`, {
        method: "PATCH",
        headers: headers,
        body: formData,
    });
    return await response.json();
}
async function redactorIpoteca(mortagesId, key, value) {
    let formData = new FormData();
    formData.append(key, value);
    let response = await fetch(`${myHost}/mortgages/${mortagesId}/`, {
        method: "PATCH",
        body: formData,
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
async function oneForAll(
    values = null,
    model = null,
    next = null,
    link = null
) {
    let url = "";
    if (next) {
        url = `${myHost}${next}`;
    } else {
        url = values
            ? `${myHost}/ofa/?values=${values}&model=${model}&${link}`
            : `${myHost}/policies/`;
    }
    let response = await fetch(url, {
        headers: headers,
    });
    return await response.json();
}
async function getChannels() {
    let response = await fetch(`${myHost}/channels/l/`, {
        headers: headers,
    });
    return await response.json();
}
async function getCompanies() {
    let response = await fetch(`${myHost}/companies/l/`, {
        headers: headers,
    });
    return await response.json();
}
async function getFilterSels(link) {
    let response = await fetch(`${myHost}/policies/?${link}`, {
        headers: headers,
    });
    return await response.json();
}
async function getPolicies(search) {
    let url = `${myHost}/policies/`;
    if (search != "") {
        url = url + `&search=${search}`;
    }
    let response = await fetch(url, {
        headers: headers,
    });
    return await response.json();
}
async function getSelsDocuments(id) {
    let response = await fetch(`${myHost}/files/?policy=${id}`, {
        headers: headers,
    });
    return await response.json();
}
async function oneForAllPost(body) {
    headers["Content-Type"] = "application/json";
    let response = await fetch(`${myHost}/ofa/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });
    if (body.upload) {
        return await response.blob();
    }
    return await response.json();
}
async function addPolicy(formData) {
    let response = await fetch(`${myHost}/pn/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function deletePolicy(id) {
    return await fetch(`${myHost}/pn/${id}/`, {
        method: "DELETE",
        headers: headers,
    });
}
async function addFiles(formData) {
    let response = await fetch(`${myHost}/files/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function getChannelsCompany(id) {
    let response = await fetch(`${myHost}/get_channels/?id=${id}`, {
        headers: headers,
    });
    return await response.json();
}
async function getActSales() {
    let response = await fetch(`${myHost}/srv/l/`, {
        headers: headers,
    });
    return await response.json();
}
async function addActSales(fornData) {
    let response = await fetch(`${myHost}/srv/pre_act/`, {
        headers: headers,
        body: fornData,
        method: "POST",
    });
    return await response.json();
}
async function createActSales(fornData) {
    let response = await fetch(`${myHost}/srv/`, {
        headers: headers,
        body: fornData,
        method: "POST",
    });
    return await response.json();
}
async function addClient(fornData) {
    let response = await fetch(`${myHost}/clients/`, {
        headers: headers,
        body: fornData,
        method: "POST",
    });
    return await response.json();
}
async function addBasePolicy(formData) {
    let response = await fetch(`${myHost}/basepolicies/upload/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function giveBasePolicy(body) {
    headers["Content-Type"] = "application/json";
    let response = await fetch(`${myHost}/basepolicies/broadcast/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });
    return await response.json();
}
async function getManagersTelefony() {
    let response = await fetch(
        "https://cloudpbx.beeline.ru/apis/portal/abonents",
        {
            headers: {
                "X-MPBX-API-AUTH-TOKEN": "d77f542d-7ccb-4bd1-bd69-5f8150416740",
            },
        }
    );
    return await response.json();
}
async function getAnalytics() {
    let response = await fetch(`${myHost}/pn/statistic/`, {
        headers: headers,
    });
    return await response.json();
}
async function getFilterAnalytics(link) {
    let response = await fetch(`${myHost}/pn/statistic/?${link}`, {
        headers: headers,
    });
    return await response.json();
}
async function getBriefly() {
    let response = await fetch(`${myHost}/pn/briefly/`, {
        headers: headers,
    });
    return await response.json();
}
async function getSellsDepartment() {
    let response = await fetch(`${myHost}/sd/l/`, {
        headers: headers,
    });
    return await response.json();
}
async function addtypePolicys(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/typies/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function addChannels(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/channels/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function addCompanies(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/companies/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function addBanks(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/banks/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function addSd(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/sd/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function redactortypePolicys(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/typies/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function redactorChannels(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/channels/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function redactorCompanies(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/companies/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function redactorBanks(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/banks/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function redactorSd(name) {
    let formData = new FormData();
    formData.append("name", name);
    let response = await fetch(`${myHost}/sd/`, {
        method: "POST",
        body: formData,
        headers: headers,
    });
    return await response.json();
}
async function getDeal(id) {
    let response = await fetch(`${myHost}/deals/${id}/`, {
        headers: headers,
    });
    return await response.json();
}

async function regManagers(formData) {
    let response = await fetch(`${myHost}/reg_user/`, {
        method: "POST",
        body: formData,
        headers: headers,
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
    chanageStatusDealCard,
    addFunnels,
    chanageLabelDealCard,
    addComments,
    getCompaniesL,
    getReasonForFailure,
    chooseReasonForFailure,
    addCalc,
    getCalc,
    deleteCalc,
    getSD,
    getScrollDeals,
    getFilterDeals,
    globalSearch,
    getScrollSearch,
    redactorPopUpDeal,
    getBanks,
    redactorPopUpDealCars,
    redactorIpoteca,
    oneForAll,
    getChannels,
    getCompanies,
    getFilterSels,
    getPolicies,
    getSelsDocuments,
    oneForAllPost,
    addPolicy,
    deletePolicy,
    addFiles,
    getChannelsCompany,
    getActSales,
    addActSales,
    createActSales,
    addClient,
    addBasePolicy,
    giveBasePolicy,
    getManagersTelefony,
    getAnalytics,
    getFilterAnalytics,
    getBriefly,
    getSellsDepartment,
    addtypePolicys,
    addChannels,
    addCompanies,
    addBanks,
    addSd,
    redactortypePolicys,
    redactorChannels,
    redactorCompanies,
    redactorBanks,
    redactorSd,
    getDeal,
    regManagers,
};
