import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import styles from "./Modal.module.css";

const ModalContext = createContext();

function Modal({ children }) {
    const [activeWindow, setActiveWindow] = useState("");

    function handleOpenModal(windowName) {
        setActiveWindow(windowName);
    }

    function handleCloseModal() {
        setActiveWindow("");
    }

    return (
        <ModalContext.Provider
            value={{ activeWindow, handleOpenModal, handleCloseModal }}
        >
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, windowName }) {
    const { handleOpenModal } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => handleOpenModal(windowName),
    });
}

function Window({ children, name }) {
    const { activeWindow, handleCloseModal } = useContext(ModalContext);
    const ref = useOutsideClick(handleCloseModal, true);

    if (activeWindow !== name) return;

    return createPortal(
        <div className={styles.overlay}>
            <div ref={ref} className={styles.modalContainer}>
                <button
                    className={styles.btnCloseCart}
                    onClick={handleCloseModal}
                >
                    <img
                        src="assets/icons/close-outline.svg"
                        alt="close cart button"
                    />
                </button>

                {cloneElement(children, { onCloseModal: handleCloseModal })}
            </div>
        </div>,
        document.body,
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
