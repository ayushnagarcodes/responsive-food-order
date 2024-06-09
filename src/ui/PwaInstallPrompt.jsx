import styles from "./PwaInstallPrompt.module.css";
import { useDispatch } from "react-redux";
import { closePwaPrompt } from "./../appSlice.js";

function PwaInstallPrompt({ deferredPrompt }) {
    const dispatch = useDispatch();

    function handleAccept() {
        deferredPrompt.current?.prompt();
        deferredPrompt.current = null;
        dispatch(closePwaPrompt());
    }

    function handleDeny() {
        dispatch(closePwaPrompt());
    }

    return (
        <div className={styles.pwaInstallPrompt}>
            <p>Install Orderpulse App!</p>
            <button className={styles.btnAccept} onClick={handleAccept}>
                Accept
            </button>
            <button className={styles.btnDeny} onClick={handleDeny}>
                Deny
            </button>
        </div>
    );
}

export default PwaInstallPrompt;
