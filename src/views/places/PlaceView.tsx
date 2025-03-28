import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPlace } from "../../api/PlaceAPI";
import { SpinnerDiamond } from "spinners-react";
import { MdLocationOn, MdCategory } from 'react-icons/md'; // Importa iconos de react-icons



export default function PlaceView() {


    const params = useParams()
    const placeId = params.placeId!
    if (!placeId) throw new Error("Place ID is required")

    const { data, isLoading, isError } = useQuery({
        queryKey: ["place", placeId],
        queryFn: () => getPlace(placeId),

    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <SpinnerDiamond size={50} />
            </div>
        )
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Error al cargar el lugar</h1>
            </div>
        )
    }


    if (data) return (
        <>
            <div className="container max-w-4xl mx-auto px-4 py-28"> {/* Aumenta el padding vertical */}
                <div className="mb-4 flex flex-row items-center justify-between"> {/* Espaciado entre elementos */}
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{data.name}</h1> {/* Texto más grande y negrita */}
                    <div className="flex items-center mt-4 space-x-4"> {/* Espaciado entre iconos */}
                        <span className="text-gray-500 flex items-center">
                            <MdLocationOn className="mr-2" /> {/* Icono de ubicación */}
                            {data.location}
                        </span>
                        <span className="text-gray-500 flex items-center">
                            <MdCategory className="mr-2" /> {/* Icono de categoría */}
                            {data.category}
                        </span>
                    </div>
                </div>

                <img
                    src={data.images[0]}
                    alt={data.name}
                    className="w-full h-96 object-cover rounded-xl shadow-lg mb-2" // Bordes redondeados y sombra
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {data.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" // Efecto hover
                        />
                    ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{data.description}</p> {/* Mejor legibilidad */}
            </div>
        </>
    );
}
