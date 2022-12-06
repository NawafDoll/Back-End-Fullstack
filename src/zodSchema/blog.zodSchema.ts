import { z } from 'zod';

export const addBlogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 char'),
      message:z.string({ required_error:"Message is required"})
      .min(8,"message must be less than 8 characters")
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 char')
      .max(15, 'Title must be less than 15 char'),

      message:z.string({ required_error:"Message is required"})
      .min(8,"message must be less than 8 characters")
  }),
  params: z.object({
    blogid: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'blog id must be a string',
    }),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    blogid: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'blog id must be a string',
    }),
  }),
});

export type deleteBlogSchemaType = z.infer<typeof deleteBlogSchema>['params'];

export type updateBlogSchemaType = z.infer<typeof updateBlogSchema>['params'];