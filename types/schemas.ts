import { z } from 'zod';

export const Role = z.enum(['admin', 'secretary']);

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
});

export type ClientSchema = z.infer<typeof clientSchema>;

export const loginSchema = z.object({
    email: z.string().nonempty("El campo es obligatorio").email("El email no es válido"),
    password: z.string().nonempty("El campo es obligatorio").min(8, "La contraseña debe tener al menos 8 caracteres").max(40, "La contraseña debe tener máximo 40 caracteres")
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const userSchema = z.object({
    id: z.string().nonempty("La cédula es requerida"),
    name: z.string().nonempty("El nombre es requerido"),
    email: z.string().email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres"),
    role: z.enum(["admin", "secretary"]),
});

export type UserSchema = z.infer<typeof userSchema>;
