import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import NavMenuHome from "./NavMenuHome";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [isTop, setIsTop] = useState(true);

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 80) {
                setIsVisible(true);
                setIsTop(true);
            } else if (currentScrollY > lastScrollY.current ) {
                setIsVisible(false);
                setIsTop(false);
            } else {
                setIsVisible(true);
                setIsTop(false);
            }
            lastScrollY.current = currentScrollY;

            console.log("isTop", isTop);
            console.log("isVisible", isVisible);

            console.log("currentScrollY", currentScrollY);
            console.log("lastScrollY", lastScrollY.current);
        });
    };

    useEffect(() => {
        const handleScrollEvent = () => handleScroll();
        window.addEventListener("scroll", handleScrollEvent);
        return () => window.removeEventListener("scroll", handleScrollEvent);
    }, []);

    return (
        <nav
            className={`fixed top-4 z-20 w-full transition-all duration-300 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full"
            } ${
                isTop
                    ? "bg-transparent shadow-sm"
                    : "bg-white rounded-3xl shadow-md"
            }`}
        >
            <div
                className={`flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-8 py-4 transition-colors duration-300 ${
                    isTop ? "text-white" : "text-gray-500"
                }`}
            >
                <Link to="/" className="text-2xl font-bold">
                    <img
                        src="/images/logo.webp"
                        alt="Descubre Calango"
                        className="w-40"
                    />
                </Link>
                <div
                    className={`hidden md:flex md:space-x-6 uppercase font-semibold text-lg transition-colors duration-300 ${
                        isTop ? "text-white" : "text-gray-700"
                    }`}
                >
                    <Link to="/explora" className="">
                        Explora
                    </Link>
                    <Link to="/login" className={`flex items-center gap-2`}>
                        <FaUser />
                    </Link>
                </div>
                <div className={`md:hidden flex items-center ${isTop? "text-gray-50" : "text-gray-700"} `}>
                    
                    <NavMenuHome />
                </div>
            </div>
        </nav>
    );
}