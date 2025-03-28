import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./Place/PlaceCard";
import { SpinnerDiamond } from "spinners-react";
import { getPlaces } from "../api/PlaceAPI";

export default function DestinosPrincipales() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-600">
                {/* Esqueleto de carga */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`bg-gray-200 rounded-3xl animate-pulse ${index === 1 ? "md:col-span-2 md:h-80" : index === 2 ? "md:col-span-2 md:h-48" : ""
                            }`}
                    >
                        <div className="flex items-center justify-center h-full">
                            <SpinnerDiamond size={50} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Error al cargar los lugares
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <h1 className="text-center text-2xl font-bold text-gray-600">
                No hay lugares disponibles
            </h1>
        );
    }

    const firstFourPlaces = data.slice(0, 4);

    const placeCardConfigs = [
        {}, // Default
        { colSpan: 2, descriptionLength: 100, imageHeight: "h-80" },
        { colSpan: 2, descriptionLength: 100, imageHeight: "h-48" },
        {}, // Default
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-600">
            {firstFourPlaces.map((place, index) => (
                <PlaceCard
                    key={place._id}
                    place={place}
                    {...placeCardConfigs[index]}
                />
            ))}
        </div>
    );
}