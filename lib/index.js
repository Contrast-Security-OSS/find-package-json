/**
 * MIT License

 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 * Copyright (c) Contrast Security <nodejs@contrastsecurity.com> (https://www.contrastsecurity.com)

 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
