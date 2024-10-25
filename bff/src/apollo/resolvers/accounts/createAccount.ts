/* eslint-disable @typescript-eslint/no-explicit-any */
import { MOCK_USERS } from "../../../__mock__";

/**
 * 创建 Account
 */
export async function createAccount(_: any, args: Record<string, any>) {
  const params = args.input;
  if (!params.email || !params.name) {
    throw new Error();
  }
  const newAccount = { id: MOCK_USERS.length + 1, ...params, role: "COMMON" };
  MOCK_USERS.push(newAccount);
  return newAccount;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
