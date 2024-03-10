import { z } from 'zod';

export const ForgotPasswordFormSchema = z.object({
    email: z.string().email('Enter a valid email address').min(1, 'This field cannot be blank'),
});

export const forgotPasswordTokenSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" }), // At least one letter
    //   .regex(/[0-9]/, { message: "Password must contain at least one number" }) // At least one number
    //   .regex(/[@$!%*#?&]/, { message: "Password must contain at least one special character" }), // At least one special character
    forgotPasswordToken: z.string()
        .min(59, { message: "Token must be at least 59 characters long" }) // Minimum length for bcrypt hash
        .max(61, { message: "Token must not exceed 61 characters" }), // Maximum length for bcrypt hash
});