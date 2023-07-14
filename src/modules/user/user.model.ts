import mongoose, { Document, Model, InferSchemaType } from "mongoose";

export interface IUserDocument extends Pick<Document, '_id'> {
  name: string;
  email: string;
  password: string;
  status: string;
  provider: string;
  networkId?: string | number;
  accessToken?: string;
}


export const UserSchema = new mongoose.Schema(
  {
    networkId: {
      type: String || Number,
      trim: true,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      default: null
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "inactive",
    },
    accessToken: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);


export const UserCreateOrUpdate = async (body: IUserDocument) => {
  let user = await UserModel.findOne({ email: body.email, provider: body.provider }) as IUserDocument;

  if (user) {
    await UserModel.findOneAndUpdate({ _id: user._id }, body);
  } else {
    const userData = new UserModel(body)
    user = await userData.save();
  }
  return user;
};