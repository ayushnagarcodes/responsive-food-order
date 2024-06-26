import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowPwaPrompt, openPwaPrompt } from "./appSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import PwaInstallPrompt from "./ui/PwaInstallPrompt";
import AppLayout from "./pages/AppLayout";
import NewOrder from "./pages/NewOrder";
import ViewOrders from "./pages/ViewOrders";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";

function App() {
    const deferredPrompt = useRef(null);
    const showPwaPrompt = useSelector(getShowPwaPrompt);
    const dispatch = useDispatch();

    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 1 * 60 * 1000 } },
    });

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
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route
                                index
                                element={<Navigate replace to="menu" />}
                            />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="menu" element={<NewOrder />} />
                            <Route path="orders" element={<ViewOrders />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route path="login" element={<h1>Login</h1>} />
                        <Route
                            path="*"
                            element={<h1>404: Page Not Found</h1>}
                        />
                    </Routes>
                </BrowserRouter>

                <Toaster
                    position="bottom-right"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "12px 24px",
                            backgroundColor: "var(--clr-neutral-50)",
                            color: "var(--clr-neutral-700)",
                        },
                    }}
                />
            </QueryClientProvider>

            {showPwaPrompt && (
                <PwaInstallPrompt deferredPrompt={deferredPrompt} />
            )}
        </>
    );
}

export default App;
