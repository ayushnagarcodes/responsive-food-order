import { useDispatch } from "react-redux";
import styles from "./UpdateItemQuantity.module.css";
import { decreaseItemQuantity, increaseItemQuantity } from "../cart/cartSlice";

export function UpdateItemQuantity({ itemName, itemQuantity }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.updateQuantity}>
            <button onClick={() => dispatch(decreaseItemQuantity(itemName))}>
                -
            </button>
            <span>{itemQuantity}</span>
            <button onClick={() => dispatch(increaseItemQuantity(itemName))}>
                +
            </button>
        </div>
    );
}
