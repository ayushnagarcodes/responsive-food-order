import {
    app,
    cartActive,
    cartMobile,
    cartMobileActive,
} from "./AppLayout.module.css";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "../features/cart/cartSlice";
import { useEffect, useState, useSyncExternalStore } from "react";
import SideNav from "../ui/SideNav";
import Menu from "../features/menu/Menu";
import Cart from "../features/cart/Cart";
import CartOverview from "../features/cart/CartOverview";

function subscribe(callback) {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
}

function AppLayout() {
    const cartQuantity = useSelector(getTotalCartQuantity);
    const browserWidth = useSyncExternalStore(subscribe, () => screen.width);

    let className = app;

    if (browserWidth > 840) {
        return (
            <AppLargeScreen cartQuantity={cartQuantity} className={className} />
        );
    }
    return <AppSmallScreen cartQuantity={cartQuantity} className={className} />;
}

function AppLargeScreen({ cartQuantity, className }) {
    // Setting CSS Class
    if (cartQuantity) className += ` ${cartActive}`;

    return (
        <div className={className}>
            <SideNav />
            <Menu />
            {cartQuantity !== 0 && <Cart />}
        </div>
    );
}

function AppSmallScreen({ cartQuantity, className }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Setting "isCartOpen" to false if "cartQuantity" becomes 0
    useEffect(
        function () {
            if (cartQuantity === 0) setIsCartOpen(false);
        },
        [cartQuantity]
    );

    // Setting CSS Class
    if (isCartOpen) {
        className += ` ${cartMobileActive}`;
    } else if (cartQuantity) {
        className += ` ${cartMobile}`;
    }

    return (
        <div className={className}>
            <SideNav />

            {!isCartOpen ? <Menu /> : <Cart />}

            {cartQuantity !== 0 && (
                <CartOverview
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                />
            )}
        </div>
    );
}

export default AppLayout;
