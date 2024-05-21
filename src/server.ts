import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import colors from "colors";

const port = 5000 || config.port;

const connectDb = async () => {
  try {
    await mongoose.connect(config.db_string as string);
    console.log(colors.yellow("connected DB"));
    app.listen(port, () => {
      console.log(colors.green("hey, I am listening the db perfectly"));
    });
  } catch (error) {
    console.log(colors.red("the database doesn't connected"), error);
  }
};

connectDb();
