#! /usr/bin/env node

import {resolve} from 'path'
import {dependencyTreeLint} from '../index'

const packageFile = resolve('./package.json')

try {
  let packageJson = require(packageFile)

  dependencyTreeLint(packageJson, result => {
    result.forEach((group) => {
      console.log('%s:', group.name)
      group.dependencies.forEach((dependency) => {
        console.log('%s: %s - %s', dependency.name, dependency.version, dependency.state)
      })
      console.log('\n')
    })

    if (dependencyWithAtLeastOneNonRelease(result[0].dependencies) || dependencyWithAtLeastOneNonRelease(result[1].dependencies)) {
      console.log('There are dependencies with a non release version! Use only dependencies with a release version.')
      process.exit(1)
    }

    console.log('Congratulations! All dependencies have a release version.')
  })
} catch (err) {
  console.error(err.stack)
  process.exit(1)
}

function dependencyWithAtLeastOneNonRelease (dependencies) {
  return dependencies.find(dependency => dependency.isNonRelease())
}
