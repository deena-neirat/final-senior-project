import React from "react";
import { Outlet } from "react-router-dom";
import GlobalNavbar from "../../components/Navbar/Navbar";
import Submenu from "../../components/Submenu/Submenu";
import Footer from "../../components/Footer/Footer";
import "./style.css";

const Layout = ({ position = "sticky", submenu = false, footer = false }) => {
    return (
        <div>
            <GlobalNavbar position={position} />
            {submenu && <Submenu />}
            <div className={position === "sticky" ? "submenuSpace" : "navbarSpace"}>
                <Outlet />
            </div>
            {footer && <Footer />}
        </div>
    );
};

export default Layout;
