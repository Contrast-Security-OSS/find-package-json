# @contrast/find-package-json

This is derived from Sindre Sorhus' `find-up-simple` [package](https://www.npmjs.com/package/find-up-simple).
It has been modified so that it is CJS, does not specify an `engine` in the its
`package.json`, and only looks for `package.json` files.

Starting in the current directory (by default) and continuing up the parent
directory chain, find `package.json` and return the parsed contents.

## Install

```sh
$ npm install @contrast/find-package-json
```

