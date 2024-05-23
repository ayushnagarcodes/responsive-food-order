import { useState } from "react";
import {
    sideNav,
    menuItems,
    menuHamburger,
    hamburgerActive,
} from "./SideNav.module.css";

function SideNav() {
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);

    return (
        <nav
            className={`${sideNav} ${isHamburgerActive ? hamburgerActive : ""}`}
        >
            <h1>Food Time</h1>

            <div>
                <div className={menuItems}>
                    <ul>
                        <li>
                            <a href="#">
                                <img src="assets/icons/storefront-outline.svg" />
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/receipt-outline.svg" />
                                <span>Bills</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="assets/icons/wallet-outline.svg" />
                                <span>Wallet</span>
                            </a>
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
            </div>
        </nav>
    );
}

export default SideNav;
