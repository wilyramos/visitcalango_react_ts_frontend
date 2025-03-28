import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SpinnerDiamond } from 'spinners-react';
import { getPlace } from "@/api/PlaceAPI";






export default function PlaceViewModal() {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const placeId = queryParams.get("viewPlace")!

    const isOpen = !!placeId // Verifica si placeId está presente para abrir el modal

    const { data, isLoading, error } = useQuery({
        queryKey: ["place", placeId],
        queryFn: () => getPlace(placeId),
    });

    console.log("data", data, "isLoading", isLoading, "error", error)


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <SpinnerDiamond size={50} />
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Error al cargar el lugar</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">No se encontró el lugar</h1>
            </div>
        )
    }
    if (data) return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all p-8">
                                    <p className='text-xs text-gray-500 mb-2'>Agregada el:</p>


                                    <Dialog.Title as="h3" className="text-4xl font-extrabold my-4 text-sky-500 hover:text-sky-600 transition-all">
                                        {/* {data.name} */}
                                    </Dialog.Title>

                                    <p className='text-md text-gray-600 mb-4'>Descripción: {data.name}</p>



                                    <div className='my-6 space-y-3'>



                                    </div>

                                    {/* <NotesPanel notes={data.notes} /> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>




        </>
    )
}
