import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header
            className="h-[50vh] flex items-center justify-center relative"
            style={{
                backgroundImage: `url(../images/bg.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            <div className="relative w-full max-w-6xl mx-auto text-center justify-center">
                <div className="flex flex-col justify-center text-white px-6 sm:px-8 space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-5xl font-bold">
                    Aventúrate en <span className="tesxt-gray-400">Calango</span>
                    </h1>
                    <p className="text-base sm:font-semibold">
                    Vive la experiencia de un paraíso escondido, lleno de encanto y tradición.
                    </p>
                    <Link
                        to="/explora"
                        className="border-l-2 text-white px-6 shadow-lg hover:text-gray-200 mx-auto "
                    >
                        Explorar
                    </Link>
                </div>            
            </div>
        </header>
    );
}