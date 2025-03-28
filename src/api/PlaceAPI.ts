import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { PlaceRegistrationForm, Place, placesSchema } from "../types";


export async function createPlace(formData: PlaceRegistrationForm) {

    try {
        const url = '/places/create'
        const { data } = await api.post<Place>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        // Si el error no es de Axios, lanza un error genérico o maneja según sea necesario
        throw new Error('Error al crear el lugar.');
    }
}

export async function uploadImages(formData: FormData, placeId: string) {
    try {
        const url = `/places/${placeId}/upload`
        // console.log(url)
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
        // Si el error no es de Axios, lanza un error genérico o maneja según sea necesario
        // throw new Error('Error al subir las imágenes.');
    }
}

export async function getPlaces() {
    try {
        const url = '/places'
        const  {data}  = await api.get(url)
        const response = placesSchema.safeParse(data)
        if (!response.success) {
            
        }
        return response.data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}