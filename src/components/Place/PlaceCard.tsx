import { Link } from "react-router-dom";
import { Place } from "../../types";
import { useNavigate } from "react-router-dom";
import { MdLocationOn, MdCategory } from 'react-icons/md';



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

    const navigate = useNavigate()
    // console.log("place", place)
    // console.log(location.pathname)

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

            <div className="absolute inset-0 flex flex-row justify-between p-4 bg-gradient-to-t from-black/70 text-white  rounded-3xl ">
                <Link to={`/places/${place._id}`}>
                    <h1 className="text-sm md:text-lg font-semibold text-shadow-DEFAULT">
                        {place.name.slice(0, 30)}
                    </h1>
                </Link>

                <div className="flex flex-col items-start">
                    <span className="text-md flex items-center">
                        <MdLocationOn className="mr-1" />
                        {place.location}
                    </span>
                    <span className="text-xs font-semibold flex items-center">
                        <MdCategory className="mr-1" />
                        {place.category}
                    </span>
                </div>

                <button
                    type="button"
                    className="absolute bottom-2 right-4 hover:bg-white hover:text-gray-800 text-white py-1 px-2 rounded-full transition duration-300 ease-in-out border-gray-100 border-2"
                    onClick={() => navigate(location.pathname + `?viewPlace=${place._id}`)} // Cambia la ruta según tu lógica de navegación
                >
                    Ver más
                </button>

                {/* <Link to={`/places/${place._id}`} className=" text-sm text-gray-100 hover:underline flex flex-end items-end cursor-pointer ">


                    ver más
                </Link> */}
            </div>
        </div>
    );
}