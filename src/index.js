import {toPairs} from 'lodash';
import {Dependency} from './dependency.js'

export function dependencyTreeLint(packageJson) {
    let dependencies = toPairs(packageJson["dependencies"]);

    return dependencies.map(pair => {
        const [name, version] = pair;
        return new Dependency(name, version);
    });
}
