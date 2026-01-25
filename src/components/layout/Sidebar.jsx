import { NavLink } from "react-router-dom";

const sidebarStyle = {
    width: "250px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    height: "100vh",
    borderRight: "1px solid #ddd",
};

const navListStyle = {
    listStyle: "none",
    padding: 0,
};

const linkStyle = {
    display: "block",
    padding: "10px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "4px",
    marginBottom: "5px",
};

const activeStyle = {
    ...linkStyle,
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
};

function Sidebar() {
    return (
        <aside style={sidebarStyle}>
            <h2 style={{ marginBottom: "20px" }}>Gestión</h2>
            <nav>
                <ul style={navListStyle}>
                    <li>
                        <NavLink
                            to="/"
                            style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
                        >
                            📊 Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/projects"
                            style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
                        >
                            🚀 Emprendimientos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
