import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"



export const usePlaceViewModal = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const initialPlaceId = queryParams.get("viewPlace");
    const [isOpen, setIsOpen] = useState(!!initialPlaceId);
    const [placeId, setPlaceId] = useState(initialPlaceId);


    useEffect(() => {
        const newPlaceId = queryParams.get("viewPlace");
        setPlaceId(newPlaceId);
        setIsOpen(!!newPlaceId);
    }, [location.search]);

    const onClose = () => {
        setIsOpen(false);
        setPlaceId(null);
        queryParams.delete("viewPlace");
        navigate({ search: queryParams.toString() });
    };
    const onOpen = (id: string) => {
        setIsOpen(true);
        setPlaceId(id);
        queryParams.set("viewPlace", id);
        navigate({ search: queryParams.toString() });
    }
    return { isOpen, placeId, onClose, onOpen };
}

export default usePlaceViewModal