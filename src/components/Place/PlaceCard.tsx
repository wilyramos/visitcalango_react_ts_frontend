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
                <Link to={`/places/${place._id}`}>
                    <h1 className="text-sm md:text-lg font-bold">{place.name.slice(0, 30)}</h1>

                </Link>
                
                <p className="hidden sm:block absolute bottom-6 left-4 text-sm text-gray-300 ">

                    {place.description.length > descriptionLength
                        ? `${place.description.slice(0, descriptionLength)}...`
                        : place.description}
                </p>

                <Link to={`/places/${place._id}`} className=" text-sm text-gray-100 hover:underline flex flex-end items-end cursor-pointer ">
                        
                    
                    ver más
                </Link>
            </div>
        </div>
    );
}