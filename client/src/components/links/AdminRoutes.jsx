import { useEffect, useContext } from "react";
import KorisnikContext from "../../context/korisnikContext";
import VraboteniContext from "../../context/vraboteniContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Table from "../pages/Table";
import UserProfile from "../pages/UserProfile";
import EditProfile from "../pages/EditProfile";
import Lists from "../pages/Lists";
import About from "../pages/About";
import Logout from "../auth/Logout";

const AdminRoutes = () => {
    const korisnikContext = useContext(KorisnikContext);
    const vraboteniContext = useContext(VraboteniContext);
    const { pathname } = useLocation();
    const { cleanUp } = korisnikContext;
    const { cleanUpWorker } = vraboteniContext;

    useEffect(() => {
        if (pathname !== "/profile/edit") {
            cleanUp();
            cleanUpWorker();
        }
        // eslint-disable-next-line
    }, [pathname]);

    return (
        <div className="container">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile/personal" element={<UserProfile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/table/*" element={<Table />} />
                <Route path="/lists/*" element={<Lists />} />
                <Route path="/profile" element={<Navigate to="/profile/personal" replace />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    );
};

export default AdminRoutes;
