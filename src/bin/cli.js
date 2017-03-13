#! /usr/bin/env node

import {resolve} from 'path';
import {dependencyTreeLint} from "../index";

const packageFile = resolve('./package.json');

try {
    let packageJson = require(packageFile);
    let dependenciesGroup = new dependencyTreeLint(packageJson);
    let dependencies = dependenciesGroup.dependencies;

    console.log('%s:', dependenciesGroup.name);
    dependencies.forEach((dependency) => {
        console.log('%s: %s - %s', dependency.name, dependency.version, dependency.state);
    });

    if (dependencyWithAtLeastOneNonRelease(dependencies)) {
        console.log('\nThere are dependencies with a non release version! Use only dependencies with a release version.');
        process.exit(1);
    }

    console.log('\nCongratulations! All dependencies have a release version.');

} catch (err) {
    console.error(err.stack);
    process.exit(1);
}

function dependencyWithAtLeastOneNonRelease(dependencies) {
    return dependencies.find(dependency => dependency.isNonRelease());
}
