import { Model, model, models, ObjectId, Schema, Types } from "mongoose";
require("dotenv").config();

export interface RefreshTokenType extends Document {
  userID: ObjectId;
  token: string;
  expire: Date;
}

const schema: Schema<RefreshTokenType> = new Schema({
  userID: {
    type: Types.ObjectId,
    required: true,
    ref: "users",
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expire: {
    type: Date,
    required: true,
  },
});

schema.statics.verifyToken = async function (token: string) {
  const refreshTokenDocument: RefreshTokenType | null = await this.findOne({ token });

  if (refreshTokenDocument && refreshTokenDocument.expire.getTime() > Date.now()) {
    return refreshTokenDocument;
  }

  return null;
};

const refreshTokenModel: Model<RefreshTokenType> =
  models.refreshTokens || model<RefreshTokenType, RefreshTokenType>("refreshTokens", schema);
export default refreshTokenModel;
