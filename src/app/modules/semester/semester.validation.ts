import { z } from 'zod'
import {
  Months,
  SemesterCode,
  SemesterTitle,
} from '../../../constant/semester.constant'

const createSemesterZodSchema = z.object({
  title: z.enum([...(SemesterTitle as [string, ...string[]])], {
    required_error: 'Title is required',
  }),
  year: z.number({
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
})

export const SemesterValidation = {
  createSemesterZodSchema,
}
