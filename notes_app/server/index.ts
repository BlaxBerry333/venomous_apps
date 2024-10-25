import type { Nitro } from "nitropack";
import connectDatabase from "./utils/connect-database";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (_nitroApp: Nitro) => {
  connectDatabase();
};
