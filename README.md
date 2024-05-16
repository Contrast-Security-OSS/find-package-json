# @contrast/find-package-json

This is derived from Sindre Sorhus' `find-up-simple` [package](https://www.npmjs.com/package/find-up-simple).
It has been modified so that it is CJS, lowers `engine` to `>=16.9.1` in
`package.json`, and only looks for `package.json` files.

Starting in the current directory (by default) and continuing up the parent
directory chain, find `package.json` and return the absolute path or undefined.

## Install

```sh
$ npm install @contrast/find-package-json
```


## Usage

```js
const { findPackageJsonAsync, findPackageJsonSync } = require('@contrast/find-package-json');

(async () => {
  console.log(await findPackageJsonAsync());
  //=> '/Users/contrast/find-package-json/package.json'
})();

console.log(findPackageJsonSync());
//=> '/Users/contrast/find-package-json/package.json'
```

## API

- findPackageJsonAsync([options])
- findPackageJsonSync([options])


### options

Type: `object`
- `cwd` (string) - Directory to start from. Default: `process.cwd()`
- `stopAt` (string) - Absolute path to stop at. Default: `path.parse(cwd).root`
