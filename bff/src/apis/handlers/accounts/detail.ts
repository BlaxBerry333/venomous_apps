import type { Handler } from "express";
import { MOCK_USERS } from "../../../__mock__";

/**
 * 获取指定的 Account
 * - GET /accounts/[id]
 */
export const getSpecifAccount: Handler = async (req, res) => {
  res.status(200).send({
    data: MOCK_USERS[0],
  });
};
