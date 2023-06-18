import { z } from 'zod'
import { BLOODGROUP, GENDER } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .min(2)
          .max(50),
        middleName: z.string().min(2).max(50).optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .min(2)
          .max(50),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...(GENDER as [string, ...string[]])], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...(BLOODGROUP as [string, ...string[]])]).optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
      faculty: z.string({
        required_error: 'Faculty is required',
      }),
      department: z.string({
        required_error: 'Department is required',
      }),
      semester: z.string({
        required_error: 'Semester is required',
      }),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
