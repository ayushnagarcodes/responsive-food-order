import { useDispatch, useSelector } from "react-redux";
import styles from "./PlaceOrder.module.css";
import { clearCart, closeCart, getTotalCartQuantity } from "./cartSlice";
import { openPaymentSuccess } from "../../appSlice";

function PlaceOrder({ newOrderData }) {
    const dispatch = useDispatch();
    const cartQuantity = useSelector(getTotalCartQuantity);

    function handlePlaceOrder() {
        if (!cartQuantity > 0) return;

        console.log(newOrderData);

        dispatch(clearCart());
        dispatch(closeCart());
        dispatch(openPaymentSuccess());
    }

    return (
        <button onClick={handlePlaceOrder} className={styles.btnPlaceOrder}>
            Place Order
        </button>
    );
}

export default PlaceOrder;
