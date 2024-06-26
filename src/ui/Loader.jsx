import styles from "./Loader.module.css";

function Loader({ type }) {
    return (
        <div
            className={styles.loaderContainer}
            style={{ height: type === "fullPage" ? "100svh" : "auto" }}
        >
            <div
                className={styles.loader}
                style={{ height: type === "fullPage" ? "80px" : "40px" }}
            ></div>
        </div>
    );
}

export default Loader;
