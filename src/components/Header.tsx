import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const images = [
    "../images/bg.webp",
    "../images/bg2.svg",
    "../images/bg3.svg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1 % images.length);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setNextImageIndex((prevIndex) => (prevIndex + 1 + 1) % images.length);
        setTransitioning(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="h-[60vh] md:h-[75vh] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40
          via-black/20 to-transparent z-10"
      ></div>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          transitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${images[nextImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative w-full max-w-6xl mx-auto text-center z-20">
        <div className="flex flex-col justify-center text-white px-6 sm:px-8 space-y-5 sm:space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Descubre la Magia de{" "}
            <span className="text-orange-500 font-semibold">Calango</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-200 leading-relaxed">
            Un destino <span className="font-bold italic text-orange-300">único</span>{" "}
            donde la aventura y la tradición se encuentran.
          </p>
          <Link
            to="/explora"
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out mx-auto text-lg"
            style={{ letterSpacing: "0.05em" }}
          >
            Explorar Destinos
          </Link>
        </div>
      </div>
    </header>
  );
}