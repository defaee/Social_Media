import { hashSync } from "bcryptjs";
import { Document, Model, model, models, Schema } from "mongoose";

interface User extends Document {
  email: string;
  username: string;
  biography?: string;
  name?: string;
  password: string;
  picture: string;
  role: "USER" | "ADMIN";
  private: boolean;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    biography: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    private: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.pre<User>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hashSync(this.password, 10);
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

const userModel: Model<User> = models.users || model("users", schema);
export default userModel;
