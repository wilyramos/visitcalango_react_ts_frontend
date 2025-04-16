import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./Place/PlaceCard";
import { SpinnerDiamond } from "spinners-react";
import { getPlaces } from "../api/PlaceAPI";
import PlaceViewModal from "@/views/places/PlaceViewModal";

export default function DestinosPrincipales() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    });

    const DestinosPrincipales = [
        { name: "Lugar 1", description: "Descripción del lugar 1", category: "natural", location: "Ubicación 1", images: ["/images/logo.webp"], _id: "1" },
        { name: "Lugar 2", description: "Descripción del lugar 2", category: "histórico", location: "Ubicación 2", images: ["/images/bg.webp"], _id: "2" },
        { name: "Lugar 3", description: "Descripción del lugar 3", category: "aventura", location: "Ubicación 3", images: ["/images/logo.webp"], _id: "3" },
        { name: "Lugar 4", description: "Descripción del lugar 4", category: "cultural", location: "Ubicación 4", images: ["/images/bg.webp"], _id: "4" },
    ];

    if (isLoading) {
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-600">
            {/* Esqueleto de carga */}
            {DestinosPrincipales.map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-300 rounded-md h-32">
                {/* Puedes agregar elementos más detallados al esqueleto si lo deseas */}
                <div className="h-20 bg-gray-400 rounded-t-md">
                    {DestinosPrincipales[index].images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Imagen de ${DestinosPrincipales[index].name}`}
                            className="w-full h-full object-cover rounded-t-md"
                        />
                    ))}
                </div>
                <div className="p-4">
                  <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        );
      }

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
        { colSpan: 2, descriptionLength: 50, imageHeight: "h-80" },
        { colSpan: 2, descriptionLength: 50, imageHeight: "h-48" },
        {}, // Default
    ];



    if (data) return (

        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-600">
                {firstFourPlaces.map((place, index) => (
                    <PlaceCard
                        key={place._id}
                        place={place}
                        {...placeCardConfigs[index]}
                    />
                ))}
            </div>



            <PlaceViewModal />

        </>

    );
}