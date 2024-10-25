import type { Handler } from "express";

/**
 * 创建 Account
 * - POST /accounts/create
 */
export const createAccount: Handler = async (req, res) => {
  res.status(201).send({
    data: null,
  });
};
