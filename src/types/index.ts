import { z } from 'zod'

/**AUTH */

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password'>

/**USER */

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>


/**DESTINOS */

export const placeSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    location: z.string(),
    images: z.array(z.string()),
    _id: z.string()
})

export type Place = z.infer<typeof placeSchema>
export type PlaceRegistrationForm = Pick<Place, 'name' | 'description' | 'category' | 'location' | 'images'>
export type PlaceResponseCreate = Pick<Place, 'name' | 'description' | 'category' | 'location' | 'images' | '_id'>

// Destinos es un array de destinos

export const placesSchema = z.array(placeSchema)
export type Places = z.infer<typeof placesSchema>

