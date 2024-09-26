import mongoose, { Connection } from "mongoose";
import config from "./config";

const MONGO_URI= `mongodb://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.nameDB}`;
//const connectionMongo= `mongodb://${config.db.user}:${config.db.password}@${config.db.host}/`;
//console.log(connectionMongo)

const connect = (): Promise<typeof mongoose> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI);

    const db: Connection = mongoose.connection;

    db.on("open", () => {
      //console.warn("Connection successful");
      resolve(mongoose);
    });

    db.on("error", (error) => {
      //console.error("Connection failed: " + error);
      reject(error);
    });
  });
};

export const db = { connect };
