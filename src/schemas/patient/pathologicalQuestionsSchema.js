import { z } from 'zod';

export const PathologicalQuestionsSchema = z.object({
    anemia: z.boolean().optional(),
    diabetes: z.boolean().optional(),
    heart_disease: z.boolean().optional(),
    allergies: z.boolean().optional(),
    allergies_description: z.string().optional(),
    taking_medication: z.boolean().optional(),
    hypertension: z.boolean().optional(),
    other_conditions: z.string().optional()
});