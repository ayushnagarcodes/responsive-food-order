import styles from "./PaymentSuccess.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closePaymentSuccess, getShowPaymentSuccess } from "../appSlice";
import { createPortal } from "react-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useOutsideClick } from "../hooks/useOutsideClick";

function PaymentSuccess() {
    const dispatch = useDispatch();
    const showPaymentSuccess = useSelector(getShowPaymentSuccess);
    const ref = useOutsideClick(handleClose, true);

    function handleClose() {
        dispatch(closePaymentSuccess());
    }

    if (!showPaymentSuccess) return;

    return createPortal(
        <div className={styles.paymentSuccessContainer}>
            <div ref={ref} className={styles.paymentSuccess}>
                <button className={styles.btnCloseCart} onClick={handleClose}>
                    <img
                        src="assets/icons/close-outline.svg"
                        alt="close cart button"
                    />
                </button>

                <div className={styles.paymentHeader}>
                    <Player
                        autoplay
                        keepLastFrame
                        src="/assets/lottie-animations/success.json"
                        className={styles.successAnimation}
                    />
                    <h3>Payment Success!</h3>
                    <p className={styles.totalAmount}>₹470</p>
                </div>

                <div className={styles.paymentInfo}>
                    <div>
                        <span>Order ID</span>
                        <span>10121211525</span>
                    </div>

                    <div>
                        <span>Payment method</span>
                        <span>QR Code</span>
                    </div>

                    <div>
                        <span>Payment time</span>
                        <span>06/11/2023 10:45</span>
                    </div>
                </div>

                <button className={styles.btnNewOrder} onClick={handleClose}>
                    New Order
                </button>

                <button className={styles.btnPrintReceipt}>
                    <img src="/assets/icons/print-outline.svg" alt="" />
                    <span>Print Receipt</span>
                </button>
            </div>
        </div>,
        document.body
    );
}

export default PaymentSuccess;
