# dependency-tree-lint

[![Travis build](https://img.shields.io/travis/hanscoder/dependency-tree-lint/master.svg)](https://travis-ci.org/hanscoder/dependency-tree-lint)
[![npm](https://img.shields.io/npm/v/dependency-tree-lint.svg)](https://www.npmjs.com/package/dependency-tree-lint)
[![dependencies Status](https://david-dm.org/hanscoder/dependency-tree-lint/status.svg)](https://david-dm.org/hanscoder/dependency-tree-lint)
[![devDependencies Status](https://david-dm.org/hanscoder/dependency-tree-lint/dev-status.svg)](https://david-dm.org/hanscoder/dependency-tree-lint?type=dev)


Checks the dependencies and devDependencies section in package.json for dependencies with non-release version.

## Note

It doesn't check the transitive dependencies but this is at the moment in development.

## Installation

```bash
npm i -E dependency-tree-lint
```

## Usage

```bash
dependency-tree-lint
```

## Development Hints

### Commit

Always commit with 

```bash
npm run commit
```

`npm run commit` uses https://github.com/commitizen/cz-cli which is setup to the [conventional-changelog](https://github.com/ajoslin/conventional-changelog).


## License

MIT

