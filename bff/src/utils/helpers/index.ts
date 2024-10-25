import { readFileSync } from "fs";
import path from "path";

/**
 * @example
 * const str = getFileContent("src/apollo/graphql/user.graphql");
 * const str = getFileContent("public/images/logo.svg");
 */
export function getFileContent(filePath: string): string {
  return readFileSync(path.join(__dirname, `../../../${filePath}`), {
    encoding: "utf-8",
  });
}
