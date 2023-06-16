import { z } from 'zod'
import { Months, SemesterCode, SemesterTitle } from './semester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...(SemesterTitle as [string, ...string[]])], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...(SemesterCode as [string, ...string[]])], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...(Months as [string, ...string[]])], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...(Months as [string, ...string[]])], {
      required_error: 'End month is required',
    }),
  }),
})

const updateSemesterZodSchema = z.object({
  body: z
    .object({
      title: z.enum([...(SemesterTitle as [string, ...string[]])]).optional(),
      year: z.string().optional(),
      code: z.enum([...(SemesterCode as [string, ...string[]])]).optional(),
      startMonth: z.enum([...(Months as [string, ...string[]])]).optional(),
      endMonth: z.enum([...(Months as [string, ...string[]])]).optional(),
    })
    .refine(data => {
      const { title, code, startMonth, endMonth } = data

      if ((title && !code) || (!title && code)) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Both title and code must be provided or skipped.'
        )
      }

      if ((startMonth && !endMonth) || (!startMonth && endMonth)) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          'Both startMonth and endMonth must be provided or skipped.'
        )
      }

      return true
    }),
})

export const SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
}
