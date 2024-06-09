import { cartOverview } from "./CartOverview.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    closeCart,
    getIsCartOpen,
    getTotalCartPrice,
    getTotalCartQuantity,
    openCart,
} from "./cartSlice";

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const isCartOpen = useSelector(getIsCartOpen);
    const dispatch = useDispatch();

    return (
        <div className={cartOverview}>
            <span>{totalCartQuantity} Item</span>
            <span>|</span>
            <span>₹{totalCartPrice}</span>

            {!isCartOpen ? (
                <button onClick={() => dispatch(openCart())}>
                    <span>View Cart</span>
                    <img src="assets/icons/bag-handle-outline.svg" alt="" />
                </button>
            ) : (
                <button onClick={() => dispatch(closeCart())}>
                    ← Back to Menu
                </button>
            )}
        </div>
    );
}

export default CartOverview;
