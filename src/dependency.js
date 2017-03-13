import {clean} from "semver";

export class Dependency {

    constructor(name, version) {
        this.name = name;
        this.version = version.trim();
        this.state = clean(version.trim()) !== null ? 'RELEASE' : 'NON-RELEASE';
    }

    isNonRelease() {
        return 'NON-RELEASE' ===this.state ;
    }
}