/* eslint-disable @typescript-eslint/no-explicit-any */
import { MOCK_USERS } from "../../../__mock__";

/**
 * 更新指定 Account
 */
export async function updateAccount(_: any, args: Record<string, any>) {
  const id = args.id;
  const params = args.input;

  if (!id) {
    throw new Error();
  }
  const user = MOCK_USERS.find((user) => user.id === id);
  return { ...user, ...params };
}

/* eslint-enable @typescript-eslint/no-explicit-any */
