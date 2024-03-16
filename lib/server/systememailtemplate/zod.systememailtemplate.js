import { z } from 'zod';
import { SystemEmailTemplateType } from '@/prisma/typescript.systememailtemplate';

// Define a Zod schema for the SystemEmailTemplateType enum
const SystemEmailTemplateTypeSchema = z.nativeEnum(SystemEmailTemplateType);

// Define a Zod schema for the SystemEmailTemplate model
const SystemEmailTemplateSchema = z.object({
    id: z.number().optional(), // ID is optional for creation scenarios
    templateName: z.string().min(1, { message: "Template name is required" }),
    internalName: z.string().min(1, { message: "Internal name is required" }),
    enabled: z.boolean(),
    emailSubject: z.string().min(1, { message: "Email subject is required" }),
    // For htmlBody, considering it might contain a lot of HTML, ensure it's a string.
    // You might not want to put a strict maximum length limit, depending on your requirements.
    htmlBody: z.string().min(1, { message: "HTML body is required" }),
    htmlEnabled: z.boolean(),
    type: SystemEmailTemplateTypeSchema,
    createdAt: z.date().optional(), // Optional as it's usually set by the database/ORM
    updatedAt: z.date().optional(), // Optional as it's usually set by the database/ORM
});

// Export the schema if you need to use it elsewhere
export { SystemEmailTemplateSchema };