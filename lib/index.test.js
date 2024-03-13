'use strict';

const assert = require('node:assert').strict;
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const { findPackageJsonAsync, findPackageJsonSync } = require('.');

const tests = [
  {
    name: 'finds the right package.json in the same directory',
    cwd: 'fixtures/one-deep',
    expected: path.resolve('fixtures/one-deep/package.json'),
  },
  {
    name: 'finds the right package.json when providing a file',
    cwd: 'fixtures/one-deep/two-deep/index.js',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'finds the right package.json in directories above',
    cwd: 'fixtures/one-deep/two-deep/three-deep/four-deep',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'stops at the specified absolute directory and fails to find package.json',
    cwd: 'fixtures/one-deep/two-deep/three-deep',
    stopAt: path.resolve('fixtures/one-deep/two-deep'),
    expected: undefined,
  },
  {
    name: 'does not stop when stopAt is invalid',
    cwd: 'fixtures/one-deep/two-deep/three-deep',
    stopAt: 'fixtures/one-deep/two-deep/three-deep/four-deep',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'fails to find package.json when there is none',
    cwd: '/some/bad/path',
    expected: undefined,
  },
  {
    name: 'fails to find package.json when there is none and stopAt is invalid',
    cwd: '/some/bad/path',
    stopAt: '/a/different/path',
    expected: undefined,
  },
];

describe('findPackageJsonSync', function () {
  it('handles an undefined cwd', function () {
    const result = findPackageJsonSync();
    assert.equal(result, path.resolve('package.json'));
  });

  it('handles a relative stopAt', function () {
    const result = findPackageJsonSync({ cwd: 'fixtures', stopAt: '..' });
    assert.equal(result, undefined);
  });

  for (const { name, cwd, stopAt, expected } of tests) {
    describe(name, function () {
      it('path string', function () {
        const result = findPackageJsonSync({ cwd, stopAt });
        assert.equal(result, expected);
      });

      it('file URL', function () {
        const url = pathToFileURL(cwd);
        const stopAtUrl = stopAt ? pathToFileURL(path.resolve(stopAt)) : undefined;
        const result = findPackageJsonSync({ cwd: url, stopAt: stopAtUrl });
        assert.equal(result, expected);
      });

      it('file URL string', function () {
        const urlStr = pathToFileURL(cwd).toString();
        const stopAtUrlStr = stopAt ? pathToFileURL(stopAt).toString() : undefined;
        const result = findPackageJsonSync({ cwd: urlStr, stopAt: stopAtUrlStr });
        assert.equal(result, expected);
      });
    });
  }
});

describe('findPackageJsonAsync', function () {
  it('handles an undefined cwd', async function () {
    const result = await findPackageJsonAsync();
    assert.equal(result, path.resolve('package.json'));
  });

  it('handles a relative stopAt', async function () {
    const result = await findPackageJsonAsync({ cwd: 'fixtures', stopAt: '..' });
    assert.equal(result, undefined);
  });

  for (const { name, cwd, stopAt, expected } of tests) {
    describe(name, function () {
      it('path string', async function () {
        const result = await findPackageJsonAsync({ cwd, stopAt });
        assert.equal(result, expected);
      });

      it('file URL', async function () {
        const url = pathToFileURL(cwd);
        const stopAtUrl = stopAt ? pathToFileURL(stopAt) : undefined;
        const result = await findPackageJsonAsync({ cwd: url, stopAt: stopAtUrl });
        assert.equal(result, expected);
      });

      it('file URL string', async function () {
        const urlStr = pathToFileURL(cwd).toString();
        const stopAtUrlStr = stopAt ? pathToFileURL(stopAt).toString() : undefined;
        const result = await findPackageJsonAsync({ cwd: urlStr, stopAt: stopAtUrlStr });
        assert.equal(result, expected);
      });
    });
  }
});
