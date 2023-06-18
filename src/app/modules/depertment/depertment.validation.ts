import { z } from 'zod'

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
    }),
  }),
})

export const DepartmentValidation = {
  createDepartmentZodSchema,
}
