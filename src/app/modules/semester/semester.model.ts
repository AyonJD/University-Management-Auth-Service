import { Schema, model } from 'mongoose'
import { ISemester, ISemesterModel } from './semester.interface'
import { Months, SemesterCode, SemesterTitle } from './semester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: SemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true }
)

// Static methods:
// semesterSchema.statics.findUserById = async function (id: string) { }

// Pre hook for checking if same year and semester exists before creating new one
semesterSchema.pre('save', async function (next) {
  const semester = this as ISemester

  const sameSemester = await semesterModel.findOne({
    title: semester.title,
    year: semester.year,
  })

  if (sameSemester) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists')
  }

  next()
})

semesterSchema.pre('findOneAndUpdate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const semester = this as any

  const sameSemester = await semesterModel.findOne({
    title: semester._update.title,
    year: semester._update.year,
  })

  if (sameSemester) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists')
  }

  next()
})

const semesterModel = model<ISemester, ISemesterModel>(
  'Semester',
  semesterSchema
)
export default semesterModel
