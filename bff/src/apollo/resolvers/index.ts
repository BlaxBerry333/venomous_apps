import {
  createAccount,
  deleteAccount,
  getAccountList,
  getSpecifAccount,
  updateAccount,
} from "./accounts";

export const graphql_resolvers = {
  Query: {
    hello: async () => "Hello World",

    accounts: getAccountList,
    account: getSpecifAccount,
  },

  Mutation: {
    createAccount,
    updateAccount,
    deleteAccount,
  },
};
