import { z } from 'zod';

const blogCreateValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    content: z.string({ required_error: 'content is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const blogValidation = {
  blogCreateValidation,
  updateValidation,
};
