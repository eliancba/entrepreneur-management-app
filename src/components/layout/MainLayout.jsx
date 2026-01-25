import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside style={{ width: "200px", background: "#eee", padding: "1rem" }}>
                <h3>Sidebar</h3>
            </aside>

            <main style={{ flex: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
