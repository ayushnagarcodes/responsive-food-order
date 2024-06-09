import { useEffect, useRef } from "react";
import AppLayout from "./ui/AppLayout";
import PwaInstallPrompt from "./ui/PwaInstallPrompt";
import { useDispatch, useSelector } from "react-redux";
import { getShowPwaPrompt, openPwaPrompt } from "./appSlice";

function App() {
    const deferredPrompt = useRef(null);
    const showPwaPrompt = useSelector(getShowPwaPrompt);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleShowPrompt = async (e) => {
            // Prevents the default install dialog from appearing on mobile
            e.preventDefault();

            // Checking whether PWA already installed or not
            const relatedApps = await navigator.getInstalledRelatedApps();
            if (relatedApps.length > 0) return; // PWA already installed

            // Saving event for later use
            deferredPrompt.current = e;
            dispatch(openPwaPrompt());
        };
        window.addEventListener("beforeinstallprompt", handleShowPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleShowPrompt);
        };
    }, []);

    return (
        <>
            <AppLayout />
            {showPwaPrompt && (
                <PwaInstallPrompt deferredPrompt={deferredPrompt} />
            )}
        </>
    );
}

export default App;
