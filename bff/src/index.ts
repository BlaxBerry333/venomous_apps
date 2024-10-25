import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

import { default as router } from "./apis/routers";
import { graphql_resolvers, graphql_schemas } from "./apollo";
import { BFF_CONFIGS } from "./configs";

const app = express();

const apollo_server = new ApolloServer({
  typeDefs: graphql_schemas,
  resolvers: graphql_resolvers,
});

async function main() {
  // Middlewares
  // ----------------------------------------------------------------------------------------------------
  app.use(express.json());

  // Apollo Server
  // ----------------------------------------------------------------------------------------------------
  await apollo_server.start();
  app.use("/graphql", expressMiddleware(apollo_server));

  // Restful API Router
  // restful 路由中间件必须位于 apollo server 中间件之后
  // ----------------------------------------------------------------------------------------------------
  app.use(router);

  // Listen Server
  // ----------------------------------------------------------------------------------------------------
  app.listen(BFF_CONFIGS.server.port, () => {
    const { name, version } = BFF_CONFIGS.info;
    const { bff } = BFF_CONFIGS.domain;
    const messages = [
      `\n✨ ${name}\x1b[32m v${version}\x1b[37m\n\n`,
      `\x1b[32m→\x1b[37m Local Server: \x1b[34m${bff}\x1b[37m\n`,
      `\x1b[32m→\x1b[37m GraphQL: \x1b[34m${bff}/graphql\x1b[37m\n\n`,
      `\x1b[32m→\x1b[37m \x1b[90mpress\x1b[37m control \x1b[90m+\x1b[37m c \x1b[90mto stop server\x1b[37m\n`,
    ];
    /* eslint-disable no-console */
    console.log(...messages);
    /* eslint-enable no-console */
  });
}

main();
