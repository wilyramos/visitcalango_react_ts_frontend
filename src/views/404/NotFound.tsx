import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1
                className="font-black text-center text-xl text-gray-600"
            >
                La página que buscas no está aquí.
            </h1>
            <p className="mt-4 text-center text-gray-400">
                Tal vez quieras volver a {' '}
                <Link
                    className="text-gray-500"
                    to={'/'}>la pagina principal</Link>
            </p>
        </div>
    )
}
