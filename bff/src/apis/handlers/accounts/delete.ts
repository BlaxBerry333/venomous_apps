import type { Handler } from "express";

/**
 * 删除指定 Account
 * - DELETE /accounts/[id]
 */
export const deleteAccount: Handler = async (req, res) => {
  res.status(200).send({
    data: null,
  });
};
