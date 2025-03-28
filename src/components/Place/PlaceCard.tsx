import { Link } from "react-router-dom";
import { Place } from "../../types";

export default function PlaceCard({
    place,
    colSpan = 1,
    descriptionLength = 50,
    imageHeight = ""
}: {
    place: Place;
    colSpan?: number;
    descriptionLength?: number;
    imageHeight?: string;
}) {
    return (
        <div
            className={` ${colSpan === 1 ? "md:col-span-1" : "md:col-span-2"
                } relative transition-all duration-500 hover:shadow-md hover:scale-[1.03]`} 
        >
            <img
                src={place.images[0]}
                alt={place.name}
                className={`w-full h-48 object-cover ${imageHeight}  rounded-3xl`}
            />

            <div className="absolute inset-0 flex flex-row justify-between p-4 bg-gradient-to-t from-black/70 text-gray-50  rounded-3xl "> {/* Modificamos la clase del overlay */}
                <Link to={`/place/${place._id}`}>
                    <h2 className="text-lg font-semibold">{place.name}</h2>
                    <p className="text-sm">
                        {place.description.substring(0, descriptionLength)}...
                    </p>
                </Link>
                <Link to={`/place/${place._id}`} className="mt-2 text-sm text-white-400 hover:underline flex flex-end items-end cursor-pointer ">
                    Ver más
                </Link>
            </div>
        </div>
    );
}