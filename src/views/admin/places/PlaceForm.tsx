import type { PlaceRegistrationForm } from '@/types/index'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import React, { useEffect, useState } from 'react'


interface PlaceFormProps {
    register: UseFormRegister<PlaceRegistrationForm>
    errors: FieldErrors<PlaceRegistrationForm>
    onImageChange: (files: FileList) => void
    clearImagesPreviews: boolean
    setClearImagesPreviews: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PlaceForm({ register, errors, onImageChange, clearImagesPreviews, setClearImagesPreviews }: PlaceFormProps) {


    // Prev images

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImagePreviews(filesArray);

            // Llama al prop onImageChange para enviar los archivos al componente padre
            onImageChange(event.target.files);
        }
    };

    // Limpiar las imágenes previas

    useEffect(() => {
        if (clearImagesPreviews) {
            setImagePreviews([]);
            setClearImagesPreviews(false);
        }
    }, [clearImagesPreviews, setClearImagesPreviews])

    return (
        <>
            <div className='w-full max-w-md space-y-2'>

                <label htmlFor='name' className=''>Nombre</label>

                <input
                    type='text'
                    id='name'
                    {...register('name', { required: 'El nombre es requerido' })}
                    className='w-full p-2 rounded-lg '
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

                <label htmlFor='description' className=''>Descripción</label>
                <textarea id='description' {...register('description', { required: 'La descripción es requerida' })} className='w-full p-2 rounded-lg '></textarea>
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

                <label htmlFor='category' className=''>Categoría</label>
                <select id='category' {...register('category', { required: 'La categoría es requerida' })} className='w-full p-2 rounded-lg '>
                    <option value=''>Selecciona una categoría</option>
                    <option value='natural'>natural</option>
                    <option value='cultural'>cultural</option>
                    <option value='religioso'>religioso</option>
                </select>
                {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}

                <label htmlFor='location' className=''>Ubicación</label>

                <input
                    type='text'
                    id='location'
                    {...register('location', { required: 'La ubicación es requerida' })}
                    className='w-full p-2 rounded-lg '
                />
                {errors.location && <ErrorMessage>{errors.location.message}</ErrorMessage>}

                <label
                    htmlFor='images'
                    className=''

                >Imágenes</label>
                <input
                    type='file'
                    id='images'
                    multiple
                    {...register('images', { required: 'Las imágenes son requeridas' })}
                    className='w-full p-2 rounded-lg '
                    accept='image/*'
                    onChange={handleImageChange}
                />
                {errors.images && <ErrorMessage>{errors.images.message}</ErrorMessage>}

                <div className='flex flex-wrap gap-4 justify-center'>
                    {imagePreviews.map((image) => (
                        <img src={image} alt='imagen' key={image} className='w-20 h-20 object-cover rounded-md' />
                    ))}
                </div>
            </div>
        </>
    )
}