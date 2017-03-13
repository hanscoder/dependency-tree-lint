import {toPairs} from 'lodash';
import {Dependency} from './dependency'
import {DependenciesGroupedByName} from "./dependency";

export function dependencyTreeLint(packageJson) {
    let dependencies = toPairs(packageJson["dependencies"]);

    let markedDependencies = dependencies.map(pair => {
        const [name, version] = pair;
        return new Dependency(name, version);
    });

    return new DependenciesGroupedByName("dependencies", markedDependencies);
}
