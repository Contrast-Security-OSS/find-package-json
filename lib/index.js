/**
 * MIT License

 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

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

const process = require('node:process');
const fs = require('node:fs');
const fsPromises = fs.promises;
const { fileURLToPath } = require('node:url');
const path = require('node:path');

const toPath = urlOrPath => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
const name = 'package.json';

async function findPackageJson({
  cwd = process.cwd(),
  stopAt,
} = {}) {

  let directory = path.resolve(toPath(cwd) ?? '');
  const { root } = path.parse(directory);
  stopAt = path.resolve(directory, toPath(stopAt ?? root));

  while (directory && directory !== stopAt && directory !== root) {
    const filePath = path.isAbsolute(name) ? name : path.join(directory, name);

    try {
      const stats = await fsPromises.stat(filePath);
      if (stats.isFile()) {
        return filePath;
      }
    // eslint-disable-next-line no-empty
    } catch { }

    directory = path.dirname(directory);
  }
}

function findPackageJsonSync({
  cwd = process.cwd(),
  stopAt,
} = {}) {
  let directory = path.resolve(toPath(cwd) ?? '');
  const { root } = path.parse(directory);
  stopAt = path.resolve(directory, toPath(stopAt ?? root));

  while (directory && directory !== stopAt && directory !== root) {
    const filePath = path.isAbsolute(name) ? name : path.join(directory, name);

    try {
      const stats = fs.statSync(filePath, { throwIfNoEntry: false });
      if (stats?.isFile()) {
        return filePath;
      }
    // eslint-disable-next-line no-empty
    } catch { }

    directory = path.dirname(directory);
  }
}


module.exports = {
  findPackageJson,
  findPackageJsonAsync: findPackageJson,
  findPackageJsonSync,
};
