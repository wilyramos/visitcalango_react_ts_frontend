import { Link } from "react-router-dom";
import { Place } from "../../types";


export default function PlaceCard({
    place,
    colSpan = 1,
    descriptionLength = 50,
    imageHeight = "h-48",
}: {
    place: Place;
    colSpan?: number;
    descriptionLength?: number;
    imageHeight?: string;
}) {
    return (
        <div
            className={` ${colSpan === 1 ? "md:col-span-1" : "md:col-span-2"
                } rounded-md relative overflow-hidden`}
        >
            <img
                src={place.images[0]}
                alt={place.name}
                className={`w-full ${imageHeight} object-cover`}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <Link to={`/place/${place._id}`}>
                    <h2 className="text-lg font-semibold">{place.name}</h2>
                    <p className="text-sm">
                        {place.description.substring(0, descriptionLength)}...
                    </p>
                </Link>
            </div>
        </div>
    );
}