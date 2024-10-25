/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */

import type { GraphQLResolveInfo } from "graphql";
import { MOCK_USERS } from "../../../__mock__";

/**
 * 获取指定的 Account
 */
export async function getSpecifAccount(
  _: any,
  args: Record<string, any>,
  context: any,
  info: GraphQLResolveInfo,
) {
  const id = args.id;
  const email = args.email;

  const user = MOCK_USERS.find((user) => {
    return (id && user.id === id) || (email && user.email === email);
  });
  return user || null;
}

/* eslint-enable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
