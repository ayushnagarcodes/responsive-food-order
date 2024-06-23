import { useState } from "react";
import {
    sideNav,
    menuItems,
    menuHamburger,
    hamburgerActive,
} from "./SideNav.module.css";
import { NavLink } from "react-router-dom";

function SideNav() {
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);

    return (
        <aside
            className={`${sideNav} ${isHamburgerActive ? hamburgerActive : ""}`}
        >
            <h1>Orderpulse</h1>

            <nav>
                <div className={menuItems}>
                    <ul>
                        <li>
                            <NavLink to="/dashboard">
                                <img src="assets/icons/storefront-outline.svg" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu">
                                <img src="assets/icons/receipt-outline.svg" />
                                <span>Menu</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders">
                                <img src="assets/icons/wallet-outline.svg" />
                                <span>Orders</span>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/notifications-outline.svg" />
                                <span>Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/chatbubbles-outline.svg" />
                                <span>Contact Us</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/settings-outline.svg" />
                                <span>Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/log-out-outline.svg" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    onClick={() => setIsHamburgerActive(!isHamburgerActive)}
                    className={menuHamburger}
                >
                    <span></span>
                </div>
            </nav>
        </aside>
    );
}

export default SideNav;
