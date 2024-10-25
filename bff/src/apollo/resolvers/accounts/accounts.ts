/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */

import type { GraphQLResolveInfo } from "graphql";
import { MOCK_USERS } from "../../../__mock__";

/**
 * 获取 Account 列表
 */
export async function getAccountList(
  _: any,
  args: Record<string, any>,
  context: any,
  info: GraphQLResolveInfo,
) {
  return MOCK_USERS;
}

/* eslint-enable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
