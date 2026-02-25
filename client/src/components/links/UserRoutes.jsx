import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Table from "../pages/Table";
import About from "../pages/About";
import Logout from "../auth/Logout";

const UserRoutes = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/table/*" element={<Table />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    );
};

export default UserRoutes;
