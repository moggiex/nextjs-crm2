import { z } from 'zod';

export const emailValidation = z.object({
    email: z.string().email('Enter a valid email address').min(1, 'This field cannot be blank'),
});

// Separate validation rule for the password
export const passwordValidation = z.string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" }); // At least one letter



// Two Passwords must match
export const passwordMatchSchema = z.object({
    password: passwordValidation, // First password
    confirmPassword: passwordValidation, // Second password, to be confirmed
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This will attach the error to `confirmPassword`
});


// Separate validation rule for the forgotPasswordToken
export const forgotPasswordTokenValidation = z.string()
    .min(59, { message: "Token must be at least 59 characters long" }) // Minimum length for bcrypt hash
    .max(61, { message: "Token must not exceed 61 characters" }); // Maximum length for bcrypt hash

// Schema that uses the separate validation rules
export const forgotPasswordTokenSchema = z.object({
    password: passwordValidation, // Use the separate validation rule for password
    forgotPasswordToken: forgotPasswordTokenValidation, // Use the separate validation rule for forgotPasswordToken
});
