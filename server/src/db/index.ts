import mongoose from "mongoose";
import EnvVars from "../common/EnvVars";

const connect = async () => {
  try {
    await mongoose.connect(EnvVars.MongoUri);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
};

export default connect;
