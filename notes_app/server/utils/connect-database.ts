import mongoose from "mongoose";
import logProcessTime from "./log-process-time";

const config = useRuntimeConfig();

export default async function connectDatabase() {
  logProcessTime({
    processName: "MongoDB Connection",
    func: async () => {
      await mongoose.connect(config.db.mongodbURI, {
        dbName: config.db.mongodbName,
      });
    },
  });
}
