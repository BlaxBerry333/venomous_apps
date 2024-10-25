import packageJson from "../../package.json";

export const BFF_CONFIGS = {
  info: {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
  },

  server: {
    port: parseInt(process.env.BFF_SERVER_PORT!),
    envName: process.env.BFF_SERVER_ENV_NAME!,
    isDevEnv: process.env.BFF_SERVER_ENV_NAME === "development",
    whiteList: [process.env.DOMAIN_ADMIN_SERVER, process.env.DOMAIN_ADMIN_CLIENT],
  },

  domain: {
    bff: process.env.DOMAIN_BFF,
    adminServer: process.env.DOMAIN_ADMIN_SERVER,
    adminClient: process.env.DOMAIN_ADMIN_CLIENT,
  },
} as const;
