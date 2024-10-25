/* eslint-disable @typescript-eslint/no-explicit-any */
import { MOCK_USERS } from "../../../__mock__";

/**
 * 删除指定 Account
 */
export async function deleteAccount(_: any, args: Record<string, any>) {
  const id = args.id;

  if (!id) {
    throw new Error();
  }
  const userIndex = MOCK_USERS.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    throw new Error();
  }
  const deletedUser = MOCK_USERS.splice(userIndex, 1);
  return deletedUser[0];
}
/* eslint-enable @typescript-eslint/no-explicit-any */
