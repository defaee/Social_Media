import { connect, connections } from "mongoose";
require("dotenv").config();

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017/social_media";

const connectToDB = async () => {
  if (connections[0].readyState) {
    return true;
  }
  await connect(uri);
};

export default connectToDB;
