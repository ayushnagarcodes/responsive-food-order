import styles from "./CartItem.module.css";

function CartItem({ item }) {
    return (
        <article className={styles.cartItem}>
            <div className={styles.imgContainer}>
                <img src={item.img} alt="" />
            </div>

            <div className={styles.itemInfo}>
                <p>{item.itemName}</p>
                <div>
                    <span
                        style={{ whiteSpace: "pre" }}
                        className={styles.price}
                    >
                        ₹{String(item.unitPrice).padEnd(7)}
                    </span>
                    <span className={styles.quantity}>{item.quantity}X</span>
                    <span className={styles.price}>₹{item.totalPrice}</span>
                </div>
            </div>
        </article>
    );
}

export default CartItem;
