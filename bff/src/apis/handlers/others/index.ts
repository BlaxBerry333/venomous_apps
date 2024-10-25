import type { Handler } from "express";

export const getOtherHello: Handler = (_, res) => {
  res.status(200).send("Hello World!");
};
