import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { Outlet } from "react-router-dom";

export function UserLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default UserLayout;
