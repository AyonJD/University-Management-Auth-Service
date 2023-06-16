import { Schema, model } from 'mongoose'
import { IFaculty, IFacultyModel } from './faculty.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

facultySchema.pre('save', async function (next) {
  const faculty = this as IFaculty

  const sameFaculty = await facultyModel.findOne({
    title: faculty.title,
  })

  if (sameFaculty) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty already exists')
  }

  next()
})

facultySchema.pre('findOneAndUpdate', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faculty = this as any

  const sameFaculty = await facultyModel.findOne({
    title: faculty._update.title,
  })

  if (sameFaculty) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty already exists')
  }

  next()
})

const facultyModel = model<IFaculty, IFacultyModel>('Faculty', facultySchema)

export default facultyModel
