import { z } from 'zod';

export const WomenQuestionSchema = z.object({
    is_pregnant: z.boolean().optional(),
    pregnancy_time_month: z.number().nonnegative().optional(),
    last_menstruation_date: z.string().optional(),
    state: z.boolean().optional()
});