import type { Handler } from "express";

/**
 * 更新指定 Account
 * - PUT /accounts/[id]
 */
export const updateAccount: Handler = async (req, res) => {
  res.status(200).send({
    data: null,
  });
};
