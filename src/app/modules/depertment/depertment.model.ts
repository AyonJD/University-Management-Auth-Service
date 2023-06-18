import { Schema, model } from 'mongoose'
import { IDepartment, IDepartmentModel } from './depertment.interface'

const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const departmentModel = model<IDepartment, IDepartmentModel>(
  'Department',
  departmentSchema
)

export default departmentModel
