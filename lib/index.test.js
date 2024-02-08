'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

const path = require('node:path');
const find = require('./index.js');
const parent = find.findPackageJsonSync;

const tests = [
  {
    name: 'finds the right package.json in the same directory',
    cwd: 'fixtures/one-deep/two-deep',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'finds the right package.json one directory above',
    cwd: 'fixtures/one-deep/two-deep/three-deep',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'finds the right package.json two directories above',
    cwd: 'fixtures/one-deep/two-deep/three-deep/four-deep',
    expected: path.resolve('fixtures/one-deep/two-deep/package.json'),
  },
  {
    name: 'stops at the specified directory and fails to find package.json',
    cwd: 'fixtures/one-deep/two-deep/three-deep/four-deep',
    stopAt: path.resolve('fixtures/one-deep/two-deep/three-deep'),
    expected: undefined,
  },
  {
    name: 'fails to find package.json when there is none',
    cwd: '/',
    expected: undefined,
  },
];

describe('findPackageJsonSync', () => {
  for (const { name, cwd, stopAt, expected } of tests) {
    it (name, () => {
      const result = find.findPackageJsonSync({ cwd, stopAt });
      assert.equal(result, expected);
    });
  }
});

describe('findPackageJsonAsync', () => {
  for (const { name, cwd, stopAt, expected } of tests) {
    it(name, async () => {
      const result = find.findPackageJsonAsync({ cwd, stopAt });
      return result.then((result) => {
        assert.equal(result, expected);
      });
    })
  }
});
