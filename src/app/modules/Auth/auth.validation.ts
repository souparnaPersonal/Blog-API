import { z } from 'zod';

const createUserValidaiton = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('invalid email'),
    password: z.string(),
  }),
});
const loginUserValidaiton = z.object({
  body: z.object({
    email: z.string().email('invalid email'),
    password: z.string(),
  }),
});

export const authValidation = {
  createUserValidaiton,
  loginUserValidaiton,
};
