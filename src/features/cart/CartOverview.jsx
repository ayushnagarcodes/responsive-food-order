import { cartOverview } from "./CartOverview.module.css";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview({ isCartOpen, setIsCartOpen }) {
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);

    return (
        <div className={cartOverview}>
            <span>{totalCartQuantity} Item</span>
            <span>|</span>
            <span>₹{totalCartPrice}</span>

            {!isCartOpen ? (
                <button onClick={() => setIsCartOpen(true)}>
                    <span>View Cart</span>
                    <img src="assets/icons/bag-handle-outline.svg" alt="" />
                </button>
            ) : (
                <button onClick={() => setIsCartOpen(false)}>
                    ← Back to Menu
                </button>
            )}
        </div>
    );
}

export default CartOverview;
