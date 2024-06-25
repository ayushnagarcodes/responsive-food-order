import styles from "./Loader.module.css";

function Loader({ type }) {
    return (
        <div
            className={styles.loaderContainer}
            style={{ height: type === "fullPage" ? "100svh" : "auto" }}
        >
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loader;
