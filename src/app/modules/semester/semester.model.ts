import { Schema, model } from 'mongoose'
import { ISemester, ISemesterModel } from './semester.interface'
import {
  Months,
  SemesterCode,
  SemesterTitle,
} from '../../../constant/semester.constant'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: Number,
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

const semesterModel = model<ISemester, ISemesterModel>(
  'Semester',
  semesterSchema
)
export default semesterModel
