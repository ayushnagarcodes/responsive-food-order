import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

import { registerSW } from "virtual:pwa-register";

const intervalMS = 1 * 60 * 1000;
registerSW({
    onRegisteredSW(swUrl, r) {
        r &&
            setInterval(async () => {
                if (!(!r.installing && navigator)) return;

                if ("connection" in navigator && !navigator.onLine) return;

                const resp = await fetch(swUrl, {
                    cache: "no-store",
                    headers: {
                        cache: "no-store",
                        "cache-control": "no-cache",
                    },
                });

                if (resp?.status === 200) await r.update();
            }, intervalMS);
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
