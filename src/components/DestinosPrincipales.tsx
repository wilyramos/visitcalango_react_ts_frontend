import { useQuery } from "@tanstack/react-query";
import { Places } from "../types";
import PlaceCard from "./Place/PlaceCard";

export default function DestinosPrincipales() {
    const { data, isLoading } = useQuery<Places>({
        queryKey: ["places"],
        queryFn: async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/places`;
            console.log(url);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });


            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div>No places found.</div>;
    }

    const firstFourPlaces = data.slice(0, 4);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6  text-gray-600">
                {firstFourPlaces.map((place, index) => {
                    switch (index) {
                        case 0:
                            return <PlaceCard key={place._id} place={place} />;
                        case 1:
                            return <PlaceCard key={place._id} place={place} colSpan={2} descriptionLength={100}  imageHeight="h-80" />;
                        case 2:
                            return <PlaceCard key={place._id} place={place} colSpan={2} descriptionLength={100} imageHeight="h-48" />;
                        case 3:
                            return <PlaceCard key={place._id} place={place}  />;
                        default:
                            return null;
                    }
                })}
            </div>
        </>
    );
}