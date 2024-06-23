import { useEffect, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeCart,
    getIsCartOpen,
    getTotalCartQuantity,
} from "../features/cart/cartSlice";
import Menu from "../features/menu/Menu";
import Cart from "../features/cart/Cart";
import CartOverview from "../features/cart/CartOverview";
import PaymentSuccess from "../ui/PaymentSuccess";
import { newOrder, cartMobileActive, cartMobile } from "./NewOrder.module.css";

function subscribe(callback) {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
}

function NewOrder() {
    const browserWidth = useSyncExternalStore(
        subscribe,
        () => window.innerWidth
    );

    let className = newOrder;

    if (browserWidth > 840) {
        return <AppLargeScreen className={className} />;
    }
    return <AppSmallScreen className={className} />;
}

function AppLargeScreen({ className }) {
    const isCartOpen = useSelector(getIsCartOpen);

    return (
        <div className={className}>
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
        [cartQuantity, dispatch]
    );

    // Setting CSS Class
    if (isCartOpen) {
        className += ` ${cartMobileActive}`;
    } else if (cartQuantity) {
        className += ` ${cartMobile}`;
    }

    return (
        <div className={className}>
            {!isCartOpen ? <Menu /> : <Cart isSmallScreen={true} />}
            {cartQuantity !== 0 && <CartOverview />}
            <PaymentSuccess />
        </div>
    );
}

export default NewOrder;
