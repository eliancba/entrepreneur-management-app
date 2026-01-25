import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
