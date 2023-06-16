import { Schema, model } from 'mongoose'
import { IDepertment, IDepertmentModel } from './depertment.interface'

const depertmentSchema = new Schema<IDepertment>(
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

const depertmentModel = model<IDepertment, IDepertmentModel>(
  'Depertment',
  depertmentSchema
)

export default depertmentModel
