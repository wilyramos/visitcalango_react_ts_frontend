import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-10 px-10">
            <div className="container mx-auto flex flex-col items-center justify-center text-center space-y-4">
                <Logo />
                <p className="text-gray-600 text-sm">© 2023 Calango. Todos os direitos reservados.</p>
                <div className="flex space-x-4">
                    <Link to="#" className="text-gray-600 hover:text-gray-800"><FaGithub size={24} /></Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800"><FaLinkedin size={24} /></Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800"><FaGlobe size={24} /></Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800"><FaEnvelope size={24} /></Link>
                </div>
            </div>
           
        </footer>
    );
}
