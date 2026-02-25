import { Routes, Route, Navigate } from "react-router-dom";
import KorisniciView from "../layout/KorisniciView";
import VraboteniView from "../layout/VraboteniView";
import MainListView from "../layout/MainListView";

const ListsRoutes = () => {
    const phone = window.innerWidth < 700;

    const phoneRoutes = {
        marginTop: "5em",
        display: "grid",
        gridTemplateColumns: "1fr",
    };

    const pcRoutes = {
        marginTop: "6em",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
    };

    return (
        <div style={phone ? phoneRoutes : pcRoutes}>
            <Routes>
                <Route path="korisnici" element={<KorisniciView />} />
                <Route path="vraboteni" element={<VraboteniView />} />

                <Route index element={<MainListView />} />
                <Route path="*" element={<Navigate to="/lists" replace />} />
            </Routes>
        </div>
    );
};

export default ListsRoutes;
