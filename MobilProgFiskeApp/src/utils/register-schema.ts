import { z } from 'zod';

export const registerSchema = z.object({
  username: z
  .string()
  .regex(new RegExp('^[a-zA-Z0-9æøåÆØÅ_]+$'), 'Username can only contain letters, numbers and underscores')
  .min(2, 'Username is too short'),
  password: z
  .string()
  .regex(new RegExp('^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zæøå\\d@$!%*?&]{6,}$'), 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
  .min(6, 'Password must be at least 6 characters long'),

});

export type registeredUser = z.infer<typeof registerSchema>;