import { useEffect, useRef, useState } from "react";
import AppLayout from "./ui/AppLayout";
import PwaInstallPrompt from "./ui/PwaInstallPrompt";

function App() {
    const [showPwaPrompt, setShowPwaPrompt] = useState(false);
    const deferredPrompt = useRef(null);

    useEffect(() => {
        const handleShowPrompt = async (e) => {
            // Prevents the default install dialog from appearing on mobile
            e.preventDefault();

            // Checking whether PWA already installed or not
            const relatedApps = await navigator.getInstalledRelatedApps();
            if (relatedApps.length > 0) return; // PWA already installed

            // Saving event for later use
            deferredPrompt.current = e;
            setShowPwaPrompt(true);
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
                <PwaInstallPrompt
                    setShowPwaPrompt={setShowPwaPrompt}
                    deferredPrompt={deferredPrompt}
                />
            )}
        </>
    );
}

export default App;
