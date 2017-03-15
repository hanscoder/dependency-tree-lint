import {toPairs} from 'lodash';
import {Dependency} from './dependency'
import {DependenciesGroupedByName} from "./dependency";


export function dependencyTreeLint(packageJson, result) {
    let all = [];
    let dependencies = toPairs(packageJson["dependencies"]);
    all.push(markDependenciesForGroup(dependencies, "dependencies"));

    dependencies = toPairs(packageJson["devDependencies"]);
    all.push(markDependenciesForGroup(dependencies, "devDependencies"));

    result(all);
}

function markDependenciesForGroup(dependencies, groupName) {
    let markedDependencies = dependencies.map(pair => {
        const [name, version] = pair;
        return new Dependency(name, version);
    });
    return new DependenciesGroupedByName(groupName, markedDependencies);
}
