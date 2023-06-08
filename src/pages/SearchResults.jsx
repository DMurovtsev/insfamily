import { useEffect, useState } from "react";
import {
    SearchTable,
    TableBasePolicies,
} from "../components/Elements/TableBasePolicies";
import { getScrollSearch, globalSearch } from "../Api";
import { TableClients } from "../components/Elements/TableClients";
import { TableDeals } from "../components/Elements/TableDeals";
import { TablePolicies } from "../components/Elements/TablePolicies";

function SearchResults() {
    const [searchResponse, setSearchResponse] = useState();
    const [currentPageBaseSource, setCurrentPageBaseSource] = useState();
    const [currentPageClients, setCurrentPageClients] = useState();
    const [currentPageDeals, setCurrentPageDeals] = useState();
    const [currentPagePolicies, setCurrentPagePolicies] = useState();
    const [loading, setLoading] = useState(false);
    const [base_policies, setBasePolicies] = useState();
    const [clients, setClients] = useState();
    const [deals, setDeals] = useState();
    const [policies, setPolicies] = useState();

    useEffect(() => {
        let search = document.getElementById("inputGlobalSearch").value;
        if (search) {
            globalSearch(search).then((response) => {
                setSearchResponse(response);
                setCurrentPageBaseSource(response.base_policies.next_page);
                setCurrentPageClients(response.clients.next_page);
                setCurrentPageDeals(response.deals.next_page);
                setCurrentPagePolicies(response.policies.next_page);
                setBasePolicies(response.base_policies.results);
                setClients(response.clients.results);
                setDeals(response.deals.results);
                setPolicies(response.policies.results);
            });
        } else return;
    }, []);
    if (!searchResponse) {
        return;
    }
    const scrollHandler = (
        e,
        currentPage,
        setCurrentPage,
        loading,
        setLoading
    ) => {
        // console.log(currentPage);
        // console.log(loading);
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPage &&
            !loading
        ) {
            setLoading(true);
            getScrollSearch(`${currentPage}`).then((data) => {
                if (Object.keys(data)[0] == "clients") {
                    setClients((prevState) => [
                        ...prevState,
                        ...data.clients.results,
                    ]);
                    setCurrentPage(data.clients.next_page);
                }
                if (Object.keys(data)[0] == "base_policies") {
                    setBasePolicies((prevState) => [
                        ...prevState,
                        ...data.base_policies.results,
                    ]);
                    setCurrentPage(data.base_policies.next_page);
                }
                if (Object.keys(data)[0] == "deals") {
                    setDeals((prevState) => [
                        ...prevState,
                        ...data.deals.results,
                    ]);
                    setCurrentPage(data.deals.next_page);
                }
                if (Object.keys(data)[0] == "policies") {
                    setPolicies((prevState) => [
                        ...prevState,
                        ...data.policies.results,
                    ]);
                    setCurrentPage(data.policies.next_page);
                }
                setLoading(false);
            });
        }
    };
    return (
        <div>
            <TableBasePolicies
                heading="База полисов"
                searchResponse={base_policies}
                scrollHandler={scrollHandler}
                currentPageBaseSource={currentPageBaseSource}
                setCurrentPageBaseSource={setCurrentPageBaseSource}
                loading={loading}
                setLoading={setLoading}
            />

            <TableClients
                heading="Клиенты"
                searchResponse={clients}
                scrollHandler={scrollHandler}
                currentPageClients={currentPageClients}
                setCurrentPageClients={setCurrentPageClients}
                loading={loading}
                setLoading={setLoading}
            />

            <TableDeals
                heading="Сделки"
                searchResponse={deals}
                scrollHandler={scrollHandler}
                currentPageDeals={currentPageDeals}
                setCurrentPageDeals={setCurrentPageDeals}
                loading={loading}
                setLoading={setLoading}
            />

            <TablePolicies
                heading="Полисы"
                searchResponse={policies}
                scrollHandler={scrollHandler}
                currentPagePolicies={currentPagePolicies}
                setCurrentPagePolicies={setCurrentPagePolicies}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    );
}
export { SearchResults };
