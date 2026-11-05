import { z } from 'zod';

export const registerSchema = z.object({
  username: z
  .string()
  .regex(new RegExp('^[a-zA-Z0-9æøåÆØÅ_]+$'), 'Username can only contain letters, numbers and underscores')
  .min(2, 'Username is too short'),
  password: z
  .string()
  .regex(new RegExp('^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-zæøåÆØÅ\\d@$!%*?&]{6,}$'), 'Passord må inneholde minst en stor bokstav, en liten bokstav, ett tall og ett spesialtegn')
  .min(6, 'Passord må være minst 6 tegn langt'),

});

export type registeredUser = z.infer<typeof registerSchema>;