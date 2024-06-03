import { useDispatch } from "react-redux";
import styles from "./UpdateItemQuantity.module.css";
import { decreaseItemQuantity, increaseItemQuantity } from "../cart/cartSlice";

export default function UpdateItemQuantity({
    itemName,
    itemQuantity,
    size = "",
}) {
    const dispatch = useDispatch();

    return (
        <div
            className={`${styles.updateQuantity} ${
                size === "small" ? styles.small : ""
            }`}
        >
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
