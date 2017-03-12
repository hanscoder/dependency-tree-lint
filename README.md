# dependency-tree-lint

Checks the dependency section in package.json for dependencies with non-release version.

## Note

It doesn't check the devDependencies and not the transitive dependencies but this is at the moment in development.

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

