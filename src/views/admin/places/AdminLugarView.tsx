import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPlace, uploadImages } from "@/api/PlaceAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { PlaceRegistrationForm } from "@/types/index";
import PlaceForm from "./PlaceForm";

export default function AdminLugarView() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null); // Estado para las imágenes seleccionadas
    const [clearImagesPreviews, setClearImagesPreviews] = useState(false); // Estado para limpiar las imágenes

    const initialValues: PlaceRegistrationForm = {
        name: "",
        description: "",
        category: "",
        location: "",
        images: [],
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialValues,
    });

    // Mutación para crear el lugar (Place)
    const { mutate: mutateCreatePlace } = useMutation({
        mutationFn: createPlace,
        onMutate: () => {
            setIsLoading(true);
            toast.loading("Creando destino...");
        },
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss();
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            toast.dismiss();
            toast.success("Destino creado correctamente.");
            // Si hay imágenes seleccionadas, se procede a subirlas
            if (selectedImages) {
                handleUploadImages(selectedImages, data._id);
            }
        },
    });

    // Mutación para subir imágenes
    const { mutate: mutateUploadImages } = useMutation({
        mutationFn: async ({ formData, placeId }: { formData: FormData, placeId: string }) => {
            return uploadImages(formData, placeId);
        },
        onError: (error) => {
            //console.error(error);
            toast.error(error.message);
            console.log(error);
            console.log(error.message);
            toast.error("Error al subir las imágenes (f).");
        },
        onSuccess: () => {
            toast.success("Imágenes subidas correctamente.");
            reset(initialValues);
            // Limpiar las imágenes seleccionadas
            setSelectedImages(null);
            setClearImagesPreviews(true);
        },
    });

    // Función para manejar la creación del lugar
    const handleCreatePlace = async (formData: PlaceRegistrationForm) => {
        try {
            mutateCreatePlace(formData);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para manejar la subida de imágenes
    const handleUploadImages = (imageFiles: FileList, placeId: string) => {
        const formData = new FormData();
        Array.from(imageFiles).forEach((file) => {
            formData.append("images", file);
        });

        mutateUploadImages({ formData, placeId });
    };

    // Manejador para la selección de imágenes
    const handleImageChange = (files: FileList) => {
        setSelectedImages(files);
    };

    // Manejador del formulario principal
    const handleSubmitForm = async (formData: PlaceRegistrationForm) => {
        try {
            await handleCreatePlace(formData);
            console.log("Formulario enviado", formData);
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <>
        <div className="container mx-auto p-2 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Places</h1>
            <p className="text-gray-600"> Agregar un nuevo lugar</p>
        </div>

            <div className=" flex items-center justify-center pt-8">
                <form
                    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <PlaceForm
                        register={register}
                        errors={errors}
                        onImageChange={handleImageChange}
                        clearImagesPreviews={clearImagesPreviews}
                        setClearImagesPreviews={setClearImagesPreviews}
                    />

                    <input
                        type="submit"
                        value={isLoading ? "Cargando..." : "Crear"}
                        className={`w-full p-3 rounded-lg mt-4 text-white ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                            }`}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </>
    );
}