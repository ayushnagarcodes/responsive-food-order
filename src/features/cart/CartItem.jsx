import styles from "./CartItem.module.css";
import UpdateItemQuantity from "../menu/UpdateItemQuantity";

function CartItem({ item }) {
    return (
        <article className={styles.cartItem}>
            <div className={styles.imgContainer}>
                <img src={item.img} alt="" />
            </div>

            <div className={styles.itemInfo}>
                <div className={styles.cartHeader}>
                    <p>{item.itemName}</p>
                    <UpdateItemQuantity
                        itemName={item.itemName}
                        itemQuantity={item.quantity}
                        size="small"
                    />
                </div>

                <div className={styles.cartFooter}>
                    <span className={styles.price}>₹{item.unitPrice}</span>
                    <span className={styles.quantity}>{item.quantity}X</span>
                    <span className={styles.totalPrice}>
                        ₹{item.totalPrice}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default CartItem;
