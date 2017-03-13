import {Dependency} from './dependency';
import {describe, it} from "mocha";
import {expect} from 'chai';

describe('Dependency', () => {

    it('should have a non-release version', () => {
        let dependency = new Dependency('dependency', '^1.1.1');

        expect(dependency.isNonRelease()).to.be.true;
    });

    it('should have a release version', () => {
        let dependency = new Dependency('dependency', '1.1.1');

        expect(dependency.isNonRelease()).to.be.false;
    });

});