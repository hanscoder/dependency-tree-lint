import {toPairs} from 'lodash';
import {Dependency} from './dependency'
import {DependenciesGroupedByName} from "./dependency";


export function dependencyTreeLint(packageJson) {
    let dependencies = toPairs(packageJson["dependencies"]);

    if (dependencies.length === 0) {
        dependencies = toPairs(packageJson["devDependencies"]);
        return markDependenciesForGroup(dependencies, "devDependencies");
    }

    return markDependenciesForGroup(dependencies, "dependencies");
}

function markDependenciesForGroup(dependencies, groupName) {
    let markedDependencies = dependencies.map(pair => {
        const [name, version] = pair;
        return new Dependency(name, version);
    });
    return new DependenciesGroupedByName(groupName, markedDependencies);
}
