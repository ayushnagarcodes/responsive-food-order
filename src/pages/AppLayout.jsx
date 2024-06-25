import { app } from "./AppLayout.module.css";
import SideNav from "../ui/SideNav";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <main className={app}>
            <SideNav />
            <Outlet />
        </main>
    );
}

export default AppLayout;
