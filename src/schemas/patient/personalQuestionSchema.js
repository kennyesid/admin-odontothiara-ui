import { z } from 'zod';

export const PersonalQuestionSchema = z.object({
    smokes: z.boolean().optional(),
    smoking_years: z.number().nonnegative().optional(),
    drinks_alcohol: z.boolean().optional(),
    alcohol_description: z.string().optional(),
    bruxism: z.boolean().optional(),
    bruxism_description: z.string().optional(),
    chews_coca: z.boolean().optional(),
    coca_description: z.string().optional(),
    state: z.boolean().optional()
});