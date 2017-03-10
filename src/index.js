import {toPairs, flow, map} from 'lodash/fp';
import {clean} from "semver";

export function dependencyTreeLint(packageJson) {
    let dependencies = toPairs(packageJson["dependencies"]);

    return flow(
        map(pair => {
            const [name, version] = pair;
            return new Dependency(name, version, toVersionType(version));
        })
    )(dependencies);
}

function toVersionType(version) {
    return clean(version.trim()) !== null ? 'RELEASE' : 'NON-RELEASE';
}

export class Dependency {

    constructor(name, version, state) {
        this.name = name;
        this.version = version;
        this.state = state;
    }

    isNonRelease() {
        return 'NON-RELEASE' === this.state;
    }
}