import { z } from 'zod';

export const gafasSchema = z.object({
    name: z
        .string()
        .nonempty('El campo es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    imageUri: z
        .string()
        .nonempty('El campo es obligatorio')
        .url('URL no válida'),
    price: z
        .string()
        .nonempty('El campo es obligatorio'),
    material: z.string().nonempty('El campo es obligatorio'),
    id: z.string().nonempty('El campo es obligatorio'),
    stock: z.string().nonempty('El campo es obligatorio')
});

export type GafasSchema = z.infer<typeof gafasSchema>;

export const clientSchema = z.object({
    name: z.string().nonempty("El campo es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    lastname: z.string().nonempty("El campo es obligatorio").min(3, "El apellido debe tener al menos 3 caracteres"),
    email: z.string().nonempty("El campo es obligatorio").email("El email no es válido"),
    id: z.string().nonempty("El campo es obligatorio").min(6, "El id no es válido"),
    phone: z.string().nonempty("El campo es obligatorio").min(10, "El número debe tener al menos 10 dígitos").max(10, "El número debe tener máximo 10 dígitos"),
    clinicalHistory: z.string().nonempty("El campo es obligatorio")
});

export type ClientSchema = z.infer<typeof clientSchema>;