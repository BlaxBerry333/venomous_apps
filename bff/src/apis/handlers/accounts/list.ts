import type { Handler } from "express";
import { MOCK_USERS } from "../../../__mock__";

/**
 * 获取 Account 列表
 * - GET /accounts/list
 */
export const getAccountList: Handler = async (req, res) => {
  res.status(200).send({
    data: MOCK_USERS,
  });
};
