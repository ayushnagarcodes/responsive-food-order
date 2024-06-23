import { useEffect, useRef } from "react";
import AppLayout from "./ui/AppLayout";
import PwaInstallPrompt from "./ui/PwaInstallPrompt";
import { useDispatch, useSelector } from "react-redux";
import { getShowPwaPrompt, openPwaPrompt } from "./appSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewOrder from "./pages/NewOrder";

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
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="menu" />} />
                        <Route path="dashboard" element={<h1>Dashboard</h1>} />
                        <Route path="menu" element={<NewOrder />} />
                        <Route path="orders" element={<h1>Orders</h1>} />
                    </Route>
                    <Route path="login" element={<h1>Login</h1>} />
                    <Route path="*" element={<h1>404: Page Not Found</h1>} />
                </Routes>
            </BrowserRouter>
            {showPwaPrompt && (
                <PwaInstallPrompt deferredPrompt={deferredPrompt} />
            )}
        </>
    );
}

export default App;
