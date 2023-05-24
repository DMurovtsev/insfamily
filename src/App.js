import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Administration } from "./pages/Administration";
import { Analytics } from "./pages/Analytics";
import { Clients } from "./pages/Clients";
import { Dashboard } from "./pages/Dashboard";
import { Education } from "./pages/Education";
import { Finance } from "./pages/Finance";
import { FinancialPolicy } from "./pages/FinancialPolicy";
import { Sales } from "./pages/Sales";
import { Staff } from "./pages/Staff";
import { Telefhony } from "./pages/Telefhony";
import { SideBar } from "./components/Elements/SideBar";
import { ClientsBases } from "./pages/ClientsBases";
import { Info } from "./components/Elements/Info";
import { Authorization } from "./pages/Authorization";
import { useEffect, useState } from "react";
import { loging, getAccessToken } from "./Api";
import { Context } from "./components/Service/Context";

function App() {
    useEffect(() => {
        loging().then((data) => {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
        });

        // периодичное обновление access
        const accessInterval = setInterval(() => {
            getAccessToken().then((token) =>
                localStorage.setItem("access", token.access)
            );
        }, 1000 * 60 * 4);
    }, []);

    return (
        <div className="App">
            <Context>
                <Router>
                    <SideBar />
                    <div className="main" id="main">
                        <Info />
                        <Routes>
                            <Route
                                path="/Administration"
                                element={<Administration />}
                            />
                            <Route
                                path="/Authorization"
                                element={<Authorization />}
                            />
                            <Route path="/Analytics" element={<Analytics />} />
                            <Route path="/Clients" element={<Clients />} />
                            <Route
                                path="/ClientsBases"
                                element={<ClientsBases />}
                            />
                            <Route path="/Dashboard" element={<Dashboard />} />
                            <Route path="/Education" element={<Education />} />
                            <Route path="/Finance" element={<Finance />} />
                            <Route
                                path="/FinancialPolicy"
                                element={<FinancialPolicy />}
                            />
                            <Route path="/Sales" element={<Sales />} />
                            <Route path="/Staff" element={<Staff />} />
                            <Route path="/Telefhony" element={<Telefhony />} />
                        </Routes>
                    </div>
                </Router>
            </Context>
        </div>
    );
}

export default App;
