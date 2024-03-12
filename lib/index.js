'use strict';

const { statSync } = require('node:fs');
const { stat } = require('node:fs/promises');
const path = require('node:path');
const process = require('node:process');
const { fileURLToPath } = require('node:url');

/**
 * Coerces a file URL to a path string.
 * @param {URL | string} urlOrPath
 * @returns {string}
 */
const toPath = (urlOrPath) => {
  try {
    return fileURLToPath(urlOrPath);
  } catch {
    return urlOrPath;
  }
};

/**
 * @param {import('.').Options=} opts
 * @returns {Promise<string | undefined>}
 */
async function findPackageJson({ cwd, stopAt } = {}) {
  let directory = cwd ? path.resolve(toPath(cwd)) : process.cwd();
  const { root } = path.parse(directory);
  const stop = stopAt ? path.resolve(directory, toPath(stopAt)) : root;

  while (directory && directory !== stop && directory !== root) {
    const filePath = path.join(directory, 'package.json');

    try {
      const stats = await stat(filePath);
      if (stats.isFile()) {
        return filePath;
      }
    } catch {}

    directory = path.dirname(directory);
  }
}

/**
 * @param {import('.').Options=} opts
 * @returns {string | undefined}
 */
function findPackageJsonSync({ cwd, stopAt } = {}) {
  let directory = cwd ? path.resolve(toPath(cwd)) : process.cwd();
  const { root } = path.parse(directory);
  const stop = stopAt ? path.resolve(directory, toPath(stopAt)) : root;

  while (directory && directory !== stop && directory !== root) {
    const filePath = path.join(directory, 'package.json');

    try {
      const stats = statSync(filePath, { throwIfNoEntry: false });
      if (stats?.isFile()) {
        return filePath;
      }
    } catch {}

    directory = path.dirname(directory);
  }
}

module.exports = {
  findPackageJson,
  findPackageJsonAsync: findPackageJson,
  findPackageJsonSync,
};
