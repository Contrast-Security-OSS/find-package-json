export interface Options {
  /**
   * The directory or file to start searching from.
   * @default process.cwd()
   */
  cwd?: URL | string;

  /**
   * The directory at which the search stops if no matches have been found. If
   * relative, it is resolved with respect to the provided `cwd`. Does not
   * search this directory.
   * @default path.parse(cwd).root
   */
  stopAt?: URL | string;
}

export function findPackageJson(opts?: Options): Promise<string | undefined>;
export { findPackageJson as findPackageJsonAsync};
export function findPackageJsonSync(opts?: Options): string | undefined;
