import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

const PWA_OPTIONS = {
    registerType: "autoUpdate",
    includeAssets: ["/assets/icons/*.png", "/assets/icons/*.svg"],
    manifest: {
        name: "Orderpulse",
        short_name: "Orderpulse",
        icons: [
            {
                src: "/assets/favicons/pwa-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/assets/favicons/pwa-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/assets/favicons/pwa-maskable-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/assets/favicons/pwa-maskable-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        background_color: "#ffffff",
        theme_color: "#000000",
        description: "A food order management app",
        related_applications: [
            {
                platform: "webapp",
                url: "https://localhost:4433/manifest.json",
            },
        ],
        screenshots: [
            {
                src: "/assets/images/screenshot.png",
                sizes: "3200x2400",
                type: "image/png",
                form_factor: "wide",
                label: "Orderpulse",
            },
            {
                src: "/assets/images/screenshot.png",
                sizes: "3200x2400",
                type: "image/png",
                label: "Orderpulse",
            },
        ],
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint(), VitePWA(PWA_OPTIONS)],
});
