import {describe, it} from 'mocha';
import {expect} from 'chai';
import {dependencyTreeLint} from './index.js';
import {Dependency} from './dependency.js';

const ONE_DEPENDENCY_WITH_FIXED_VERSION = new Dependency("dependency1", "1.1.1", 'RELEASE');
const ONE_DEPENDENCY_WITH_NON_FIXED_VERSION = new Dependency("dependency1", "^1.1.1", 'NON-RELEASE');
const DEPENDENCYIES_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION = [
    new Dependency("dependency1", "^1.1.1", 'NON-RELEASE'),
    new Dependency("dependency2", "1.1.1", 'RELEASE'),
    new Dependency("dependency3", "2.1.1", 'RELEASE'),
    new Dependency("dependency4", "1.1.x", 'NON-RELEASE'),
];


const PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_ONE_FIXED_VERSION = {
    "dependencies": {
        "dependency1": "1.1.1",
    }
};

const PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_NON_FIXED_VERSION = {
    "dependencies": {
        "dependency1": "^1.1.1",
    }
};

const PACKAGE_JSON_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION = {
    "dependencies": {
        "dependency1": "^1.1.1",
        "dependency2": "1.1.1",
        "dependency3": "2.1.1",
        "dependency4": "1.1.x",
    }
};

describe('dependency-tree-lint', () => {

    it('should mark one dependency as release', () => {
        let dependencies = dependencyTreeLint(PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_ONE_FIXED_VERSION);

        expect(dependencies).to.include(ONE_DEPENDENCY_WITH_FIXED_VERSION);
        expect(dependencies).to.have.length(1);
    });

    it('should mark one dependency as non release', () => {
        let dependencies = dependencyTreeLint(PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_NON_FIXED_VERSION);

        expect(dependencies).to.include(ONE_DEPENDENCY_WITH_NON_FIXED_VERSION);
        expect(dependencies).to.have.length(1);
    });

    it('should mark more dependencies as release or non-release', () => {
        let dependencies = dependencyTreeLint(PACKAGE_JSON_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION);

        expect(dependencies).to.deep.include.members(DEPENDENCYIES_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION);
        expect(dependencies).to.have.length(4);
    });

});