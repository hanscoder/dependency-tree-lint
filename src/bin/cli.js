#! /usr/bin/env node

import {resolve} from 'path'
import {dependencyTreeLint} from '../index'

const packageFile = resolve('./package.json')

try {
  let packageJson = require(packageFile)

  dependencyTreeLint(packageJson, result => {
    result.forEachSection(section => dumpSection(section))

    if (result.hasAtLeastOneDependencyWithNonRelease()) {
      console.log('There are dependencies with a non release version! Use only dependencies with a release version.')
      // noinspection JSUnresolvedVariable,JSUnresolvedFunction
      process.exit(1)
    }

    console.log('Congratulations! All dependencies have a release version.')
  })
} catch (err) {
  console.error(err.stack)
  // noinspection JSUnresolvedVariable,JSUnresolvedFunction
  process.exit(1)
}

function dumpSection (section) {
  console.log('%s:', section.name)
  section.forEachDependency(dependency => dumpDependency(dependency))
  console.log('\n')
}

function dumpDependency (dependency) {
  console.log('%s: %s - %s', dependency.name, dependency.version, dependency.state)
}