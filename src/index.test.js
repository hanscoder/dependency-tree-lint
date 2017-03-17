import {describe, it} from 'mocha'
import {expect} from 'chai'
import {dependencyTreeLint} from './index'
import {Dependency} from './dependency'

const ONE_DEPENDENCY_WITH_FIXED_VERSION = new Dependency('dependency1', '1.1.1', 'RELEASE')
const ONE_DEPENDENCY_WITH_NON_FIXED_VERSION = new Dependency('dependency1', '^1.1.1', 'NON-RELEASE')
const DEPENDENCIES_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION = [
  new Dependency('dependency1', '^1.1.1', 'NON-RELEASE'),
  new Dependency('dependency2', '1.1.1', 'RELEASE'),
  new Dependency('dependency3', '2.1.1', 'RELEASE'),
  new Dependency('dependency4', '1.1.x', 'NON-RELEASE')
]

const PACKAGE_JSON_WITH_GROUP_DEPENDENCIES = {
  'dependencies': {
    'dependency1': '1.1.1'
  }
}

const PACKAGE_JSON_WITH_GROUP_DEV_DEPENDENCIES = {
  'devDependencies': {
    'dependency1': '1.1.1'
  }
}

const PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_ONE_FIXED_VERSION = {
  'dependencies': {
    'dependency1': '1.1.1'
  }
}

const PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_NON_FIXED_VERSION = {
  'dependencies': {
    'dependency1': '^1.1.1'
  }
}

const PACKAGE_JSON_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION = {
  'dependencies': {
    'dependency1': '^1.1.1',
    'dependency2': '1.1.1',
    'dependency3': '2.1.1',
    'dependency4': '1.1.x'
  }
}

const PACKAGE_JSON_WITH_DEPENDENCIES_AND_DEV_DEPENDENCIES = {
  'dependencies': {
    'dependency1': '^1.1.1'
  },
  'devDependencies': {
    'dependency2': '1.1.1'
  }
}

describe('dependency-tree-lint', () => {
  it('should group as dependency', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_GROUP_DEPENDENCIES, dependencies => {
      expect(dependencies[0].name).to.include('dependencies')

      done()
    })
  })

  it('should group as devDependencies', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_GROUP_DEV_DEPENDENCIES, dependencies => {
      expect(dependencies[1].name).to.include('devDependencies')

      done()
    })
  })

  it('should mark one dependency as release', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_ONE_FIXED_VERSION, dependencies => {
      expect(dependencies[0].dependencies).to.include(ONE_DEPENDENCY_WITH_FIXED_VERSION)
      expect(dependencies[0].dependencies).to.have.length(1)

      done()
    })
  })

  it('should mark one dependency as non release', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_ONE_DEPENDENCY_WITH_NON_FIXED_VERSION, dependencies => {
      expect(dependencies[0].dependencies).to.include(ONE_DEPENDENCY_WITH_NON_FIXED_VERSION)
      expect(dependencies[0].dependencies).to.have.length(1)

      done()
    })
  })

  it('should mark more dependencies as release or non-release', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION, dependencies => {
      expect(dependencies[0].dependencies).to.deep.include.members(DEPENDENCIES_WITH_DEPENDENCIES_WITH_WITH_FIXED_AND_NON_FIXED_VERSION)
      expect(dependencies[0].dependencies).to.have.length(4)

      done()
    })
  })

  it('should group by dependencies and devDependencies', (done) => {
    dependencyTreeLint(PACKAGE_JSON_WITH_DEPENDENCIES_AND_DEV_DEPENDENCIES, dependencies => {
      expect(dependencies[0].name).to.include('dependencies')
      expect(dependencies[1].name).to.include('devDependencies')
      expect(dependencies).to.have.length(2)

      done()
    })
  })
})
