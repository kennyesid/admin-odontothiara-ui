import { boolean, z } from 'zod';
import { PersonalQuestionSchema } from './personalQuestionSchema';
import { PathologicalQuestionsSchema } from './pathologicalQuestionsSchema';
import { WomenQuestionSchema } from './womenQuestionSchema';

export const PatientSchema = z.object({
    id: z.string().uuid().optional(),
    rol_id: z.number().optional().default(2),
    rol_name: z.string().optional(),
    group_id: z.number().optional().default(1),
    group_code: z.string().optional(),
    name: z.string().optional(), // Lo hicimos opcional para evitar errores
    first_surname: z.string().optional(),
    second_surname: z.string().optional(),
    image: z.string().optional(),
    age: z.number().int().nonnegative().optional(),
    sexo: z.enum(['Masculino', 'Femenino']).optional(),
    birth_date: z.string().optional(),
    place_of_birth: z.string().optional(),
    occupation: z.string().optional(),
    marital_status: z.string().optional().default('S/N'),
    address: z.string().optional(),
    identity_card: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),

    // Aquí los pasamos como objetos, no como funciones
    personal_question: PersonalQuestionSchema.optional(),
    pathological_question: PathologicalQuestionsSchema.optional(),
    women_questions: WomenQuestionSchema.optional(),

    created_at: z.string().optional(), // Supabase suele devolver strings ISO
    updated_at: z.string().optional(),
    state: z.boolean().optional()
});