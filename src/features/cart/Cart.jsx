import styles from "./Cart.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, getCart, getTotalCartPrice } from "./cartSlice";
import CartItem from "./CartItem";
import PlaceOrder from "./PlaceOrder";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const orderTypeData = ["Dine In", "Take Away", "Delivery"];

const paymentOptionsData = [
    { type: "Cash", img: "assets/icons/cash-outline.svg" },
    { type: "Credit/Debit Card", img: "assets/icons/card-outline.svg" },
    { type: "QR Code", img: "assets/icons/qr-code-outline.svg" },
];

function Cart({ isSmallScreen = false }) {
    const [orderType, setOrderType] = useState("Dine In");
    const [paymentType, setPaymentType] = useState("Cash");
    const dispatch = useDispatch();
    const ref = useOutsideClick(handleClose, true, isSmallScreen);

    const cart = useSelector(getCart);
    const subTotal = useSelector(getTotalCartPrice);
    const tax = (5 / 100) * subTotal;
    const total = subTotal + tax;

    const newOrderData = {
        orderType,
        cart,
        subTotal,
        tax,
        total,
        paymentType,
    };

    function handleClose() {
        dispatch(closeCart());
    }

    return (
        <div className={styles.cartContainer}>
            <section
                ref={ref}
                className={`${styles.cart} ${
                    !isSmallScreen ? styles.largeScreen : ""
                }`}
            >
                <button className={styles.btnCloseCart} onClick={handleClose}>
                    <img
                        src="assets/icons/close-outline.svg"
                        alt="close cart button"
                    />
                </button>

                <div className={styles.cartInfo}>
                    <h2>Table No.</h2>
                    <span>Customer Name</span>
                </div>

                <OrderType orderType={orderType} setOrderType={setOrderType} />

                {orderType === "Delivery" ? (
                    <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
                        Coming Soon!
                    </p>
                ) : (
                    <div className={styles.cartItems}>
                        {cart.map((item) => (
                            <CartItem item={item} key={item.itemName} />
                        ))}
                    </div>
                )}

                <TotalBill subTotal={subTotal} tax={tax} total={total} />

                <PaymentOptions
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                />

                <PlaceOrder newOrderData={newOrderData} />
            </section>
        </div>
    );
}

function OrderType({ orderType, setOrderType }) {
    return (
        <div className={styles.orderType}>
            {orderTypeData.map((data) => (
                <button
                    className={`${orderType === data ? styles.selected : ""}`}
                    onClick={() => setOrderType(data)}
                    key={data}
                >
                    {data}
                </button>
            ))}
        </div>
    );
}

function TotalBill({ subTotal, tax, total }) {
    return (
        <div className={styles.totalBill}>
            <p>
                <span>Sub Total</span>
                <span>₹{subTotal}</span>
            </p>
            <p>
                <span>Tax 5%</span>
                <span>₹{tax}</span>
            </p>
            <p>
                <span>Total Amount</span>
                <span>₹{total}</span>
            </p>
        </div>
    );
}

function PaymentOptions({ paymentType, setPaymentType }) {
    return (
        <div className={styles.paymentOptions}>
            {paymentOptionsData.map((data) => (
                <button
                    onClick={() => setPaymentType(data.type)}
                    key={data.type}
                >
                    <div
                        className={`${
                            paymentType === data.type ? styles.selected : ""
                        }`}
                    >
                        <img src={data.img}></img>
                    </div>
                    <span>{data.type}</span>
                </button>
            ))}
        </div>
    );
}

export default Cart;
