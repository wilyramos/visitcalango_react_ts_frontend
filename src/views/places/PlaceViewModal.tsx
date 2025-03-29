import { Fragment } from 'react';
import { Button, Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { SpinnerDiamond } from 'spinners-react';
import { getPlace } from "@/api/PlaceAPI";
import usePlaceViewModal from "@/hooks/usePlaceViewModal";
import { MdLocationOn, MdCategory, MdClose } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

export default function PlaceViewModal() {
    const { isOpen, placeId, onClose } = usePlaceViewModal();
    const navigate = useNavigate()

    const { data, isLoading, error } = useQuery({
        queryKey: ["place", placeId],
        queryFn: () => placeId ? getPlace(placeId) : null,
        enabled: !!placeId,
    });

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <SpinnerDiamond size={40} color="#64748b" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="rounded-lg p-6 shadow-md bg-white/90 backdrop-blur-md">
                    <h1 className="text-lg font-semibold text-red-500 mb-2">Error al cargar</h1>
                    <button onClick={handleClose} className="mt-2 px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">Cerrar</button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="rounded-lg p-6 shadow-md bg-white/90 backdrop-blur-md">
                    <h1 className="text-lg font-semibold text-yellow-500 mb-2">No encontrado</h1>
                    <button onClick={handleClose} className="mt-2 px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto bg-black/10  z-10">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-gray-50 text-left align-middle shadow-md transition-all">
                                {/* Barra superior minimalista */}
                                <div className="flex justify-between items-center px-4 py-3">
                                    <Dialog.Title as="h3" className="text-2xl font-semibold text-gray-800">
                                        {data.name}
                                    </Dialog.Title>
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 "
                                    >
                                        <MdClose className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Contenido principal */}
                                <div className="p-4 md:p-6">
                                    {/* Carrusel de imágenes minimalista */}
                                    {data.images && data.images.length > 0 && (
                                        <div className="mb-4 overflow-hidden">
                                            <Swiper
                                                modules={[Navigation, Pagination, A11y]}
                                                spaceBetween={5}
                                                slidesPerView={1}
                                                navigation={{
                                                    prevEl: '.swiper-button-prev-minimal',
                                                    nextEl: '.swiper-button-next-minimal',
                                                }}
                                                pagination={{ clickable: true }}

                                            >
                                                {data.images.map((image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <img
                                                            src={image}
                                                            alt={`${data.name} - Imagen ${index + 1}`}
                                                            className="w-full h-[300px] object-cover rounded-md"
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                                {data.images.length > 1 && (
                                                    <>
                                                        <div className="swiper-button-prev swiper-button-prev-minimal text-gray-500 hover:text-gray-700 cursor-pointer absolute top-1/2 -translate-y-1/2 left-2 z-10"></div>
                                                        <div className="swiper-button-next swiper-button-next-minimal text-gray-500 hover:text-gray-700 cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 z-10"></div>
                                                    </>
                                                )}
                                            </Swiper>
                                        </div>
                                    )}

                                    <div className="flex items-center mb-2 space-x-2 text-gray-500 text-xs">
                                        <MdLocationOn className="h-4 w-4" />
                                        <span>{data.location}</span>
                                    </div>
                                    <div className="flex items-center mb-3 space-x-2 text-gray-500 text-xs">
                                        <MdCategory className="h-4 w-4" />
                                        <span>{data.category}</span>
                                    </div>

                                    {data.description && (
                                        <div className="mb-4">
                                            <h4 className="text-md font-semibold text-gray-700 mb-1">Descripción</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
                                        </div>
                                    )}
                                    <Button
                                        type="button"
                                        className="mt-2 w-full rounded-md bg-gray-800 text-white py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
                                        onClick={() => {
                                            handleClose();
                                            navigate(`/places/${data._id}`);
                                        }}
                                    >
                                        Ver más detalles
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}