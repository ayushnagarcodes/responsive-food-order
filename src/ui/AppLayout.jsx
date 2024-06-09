import { app, cartMobile, cartMobileActive } from "./AppLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    closeCart,
    getIsCartOpen,
    getTotalCartQuantity,
} from "../features/cart/cartSlice";
import { useEffect, useSyncExternalStore } from "react";
import SideNav from "../ui/SideNav";
import Menu from "../features/menu/Menu";
import Cart from "../features/cart/Cart";
import CartOverview from "../features/cart/CartOverview";
import PaymentSuccess from "./PaymentSuccess";

function subscribe(callback) {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
}

function AppLayout() {
    const browserWidth = useSyncExternalStore(subscribe, () => screen.width);

    let className = app;

    if (browserWidth > 840) {
        return <AppLargeScreen className={className} />;
    }
    return <AppSmallScreen className={className} />;
}

function AppLargeScreen({ className }) {
    const isCartOpen = useSelector(getIsCartOpen);

    return (
        <div className={className}>
            <SideNav />
            <Menu />
            {isCartOpen && <Cart />}
            <PaymentSuccess />
        </div>
    );
}

function AppSmallScreen({ className }) {
    const cartQuantity = useSelector(getTotalCartQuantity);
    const isCartOpen = useSelector(getIsCartOpen);
    const dispatch = useDispatch();

    // Setting "isCartOpen" to false if "cartQuantity" becomes 0
    useEffect(
        function () {
            if (cartQuantity === 0) dispatch(closeCart());
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
            {!isCartOpen ? <Menu /> : <Cart isSmallScreen={true} />}
            {cartQuantity !== 0 && <CartOverview />}
            <PaymentSuccess />
        </div>
    );
}

export default AppLayout;
