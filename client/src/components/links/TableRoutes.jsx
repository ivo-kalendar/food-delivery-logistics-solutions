import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Додадено Routes
import TablesContext from "../../context/tablesContext";
import EditedTable from "../layout/EditedTable";
import MainListView from "../layout/MainListView";
import TableView from "../layout/TableView";

const TableRoutes = () => {
    const { pathname } = useLocation();
    const tablesContext = useContext(TablesContext);
    const { allTables } = tablesContext;

    const tableRoutesStiles = {
        marginTop: "6em",
        display: "grid",
        gridTemplateColumns:
            pathname === "/table/edit" || !allTables
                ? "1fr"
                : "repeat(auto-fill, [col-start] minmax(100px, 1fr) [col-end])",
    };

    return (
        <div style={tableRoutesStiles}>
            <Routes>
                <Route
                    path="firstroute"
                    element={
                        <>
                            <h1>Прва Рута</h1>
                            <MainListView />
                        </>
                    }
                />

                <Route
                    path="secondroute"
                    element={
                        <>
                            <h1>Втора Рута</h1>
                            <MainListView />
                        </>
                    }
                />

                <Route path="edit" element={<EditedTable />} />
                <Route index element={<TableView />} />
                <Route path="*" element={<Navigate to="/table" replace />} />
            </Routes>
        </div>
    );
};

export default TableRoutes;
