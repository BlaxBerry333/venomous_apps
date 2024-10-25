import { getFileContent } from "../../utils/helpers";

const accountTypes = getFileContent("src/apollo/graphql/account.graphql");
const queryTypes = getFileContent("src/apollo/graphql/query.graphql");
const mutationTypes = getFileContent("src/apollo/graphql/mutation.graphql");

export const graphql_schemas = `
    ${accountTypes}
    ${queryTypes} 
    ${mutationTypes}
`;
