import styles from "./MenuItemList.module.css";
import { addItem, getItemQuantity } from "../cart/cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useDispatch, useSelector } from "react-redux";

function MenuItemList({ menuData }) {
    if (menuData.length === 0)
        return (
            <p
                style={{
                    margin: "3rem 1rem",
                    fontSize: "var(--fs-md)",
                    color: "var(--clr-primary-400)",
                }}
            >
                No items found! Try something different 😊
            </p>
        );

    return (
        <section className={styles.menuItemListFlex}>
            {menuData.map((item) => (
                <MenuItem item={item} key={item.name} />
            ))}
        </section>
    );
}

function MenuItem({ item }) {
    const { name, price, isVeg, img } = item;
    const quantity = useSelector(getItemQuantity(name));
    const dispatch = useDispatch();

    function handleAddToCart() {
        const newItem = {
            itemName: name,
            img,
            unitPrice: price,
            quantity: 1,
            totalPrice: price * 1,
        };
        dispatch(addItem(newItem));
    }

    return (
        <article
            className={`${styles.menuItem} ${
                quantity !== 0 ? styles.borderActive : ""
            }`}
        >
            <div className={styles.imgContainer}>
                <img src={img} alt="" />
            </div>

            <p>{name}</p>

            <div className={styles.details}>
                <span className={styles.price}>₹{price}</span>

                {isVeg ? (
                    <span className={styles.type}>
                        <img src="assets/icons/veg.png" alt="" />
                        Veg
                    </span>
                ) : (
                    <span className={styles.type}>
                        <img
                            src="assets/icons/non-veg.png"
                            alt=""
                            style={{ filter: "hue-rotate(245deg)" }}
                        />
                        Non Veg
                    </span>
                )}
            </div>

            {quantity === 0 ? (
                <button onClick={handleAddToCart} className={styles.btnAdd}>
                    Add to Cart
                </button>
            ) : (
                <UpdateItemQuantity itemName={name} itemQuantity={quantity} />
            )}
        </article>
    );
}

export default MenuItemList;
