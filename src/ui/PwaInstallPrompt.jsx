import styles from "./PwaInstallPrompt.module.css";

function PwaInstallPrompt({ setShowPwaPrompt, deferredPrompt }) {
    function handleAccept() {
        deferredPrompt.current?.prompt();
        deferredPrompt.current = null;
        setShowPwaPrompt(false);
    }

    function handleDeny() {
        setShowPwaPrompt(false);
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
