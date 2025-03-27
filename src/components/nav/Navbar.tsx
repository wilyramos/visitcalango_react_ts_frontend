import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import NavMenuHome from "./NavMenuHome";


export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= lastScrollY.current) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            lastScrollY.current = currentScrollY;
        });
    };

    useEffect(() => {
        const handleScrollEvent = () => handleScroll();
        window.addEventListener("scroll", handleScrollEvent);
        return () => window.removeEventListener("scroll", handleScrollEvent);
    }, []);

    return (
        <nav
            className={`fixed bg-gray-50 bg-opacity-10 backdrop-blur-md rounded-3xl top-4 z-20 w-4/5 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
                }`}
        >
            <div className="flex justify-between items-center px-10 py-4">
                <Link to="/" className="text-2xl font-bold">
                    <img src="/images/logo.webp" alt="Descubre Calango" className="w-40" />
                </Link>
                <div className="hidden md:flex md:space-x-6 text-white uppercase ">
                    <Link to="/explora" className=" ">
                        Explora
                    </Link>
                    <Link to="/login" className={`flex items-center gap-2 `}>
                        <FaUser />
                    </Link>
                </div>
                <div className="md:hidden flex justify-center items-center py-4 ">
                    <NavMenuHome />
                </div>
            </div>
        </nav>
    );
}