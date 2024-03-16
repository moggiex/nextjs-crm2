import { z } from 'zod';

const SystemSettingSchema = z.object({
    id: z.number().optional(), // Assuming ID is managed by the database and not input by the user
    siteName: z.string().default("My Site"),
    siteURL: z.string().url().default("http://localhost:3000"),
    siteEmailAddress: z.string().email().default("email@email.com"),
    loginEnabled: z.boolean().default(true),
    loginDisabledMessage: z.string().optional(),
    createAccountEnabled: z.boolean().optional().default(true),
    createAccountDisabledMessage: z.string().optional(),
    registrationEnabled: z.boolean().optional().default(true),
    registrationDisabledMessage: z.string().optional(),
    forgotPasswordEnabled: z.boolean().optional().default(true),
    forgotPasswordDisabledMessage: z.string().optional(),
    emailEnabled: z.boolean().optional().default(true),
    emailFrom: z.string().optional(),
    emailServerUser: z.string().optional(),
    emailServerPassword: z.string().optional(),
    emailServerHost: z.string().optional(),
    emailServerPort: z.number().optional().default(587),
    emailServerSecure: z.boolean().optional().default(true),
    businessName: z.string().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    cityState: z.string().optional(),
    postcodeZipCode: z.string().optional(),
    country: z.string().optional(),
    phoneNumber: z.string().optional(),
    // `createdAt` and `updatedAt` are typically managed by the database and not input by the user
});

export default SystemSettingSchema;
