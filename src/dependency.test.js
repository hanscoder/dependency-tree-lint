import { Dependency, Section } from './dependency'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('Dependency', () => {
  it('should have a non-release version', () => {
    let dependency = asDependency('dependency').asNonRelease().build()

    let nonRelease = dependency.isNonRelease()

    expect(nonRelease).to.be.true // eslint-disable-line no-unused-expressions
  })

  it('should have a release version', () => {
    let dependency = asDependency('dependency').asRelease().build()

    let nonRelease = dependency.isNonRelease()

    expect(nonRelease).to.be.false // eslint-disable-line no-unused-expressions
  })

  it('should have at least one dependency with a non release version', () => {
    let dependency = asDependency('dependency')
      .asRelease()
      .withSection(asSection('dependency')
        .withDependency(asDependency('dependency1').asRelease())
        .withDependency(asDependency('dependency').asNonRelease())
        .withDependency(asDependency('dependency2').asRelease()))
      .build()

    let hasAtLeastOneDependencyWithNonRelease = dependency.hasAtLeastOneDependencyWithNonRelease()

    expect(hasAtLeastOneDependencyWithNonRelease).to.be.true // eslint-disable-line no-unused-expressions
  })

  it('should have dependencies with only release version', () => {
    let dependency = asDependency('dependency')
      .asRelease()
      .withSection(asSection('dependency')
        .withDependency(asDependency('dependency1').asRelease())
        .withDependency(asDependency('dependency2').asRelease())
        .withDependency(asDependency('dependency3').asRelease()))
      .build()

    let hasAtLeastOneDependencyWithNonRelease = dependency.hasAtLeastOneDependencyWithNonRelease()

    expect(hasAtLeastOneDependencyWithNonRelease).to.be.false // eslint-disable-line no-unused-expressions
  })

  it('should provide each section', () => {
    let dependency = asDependency('dependency')
      .asRelease()
      .withSection(asSection('section1'))
      .withSection(asSection('section2'))
      .withSection(asSection('section3'))
      .build()

    let providedSections = []
    dependency.forEachSection(section => providedSections.push(section))

    expect(providedSections).eql(dependency.sections)
  })
})

function asDependency (name) {
  return new DependencyBuilder(name)
}

function asSection (name) {
  return new SectionBuilder(name)
}

class SectionBuilder {
  constructor (name) {
    this.name = name
    this.dependencies = []
  }

  withDependency (builder) {
    this.dependencies.push(builder.build())
    return this
  }

  build () {
    return new Section(this.name, this.dependencies)
  }
}

class DependencyBuilder {
  constructor (name) {
    this.name = name
    this.sections = []
  }

  asNonRelease () {
    this.version = '^1.1.1'
    return this
  }

  asRelease () {
    this.version = '1.1.1'
    return this
  }

  withSection (builder) {
    this.sections.push(builder.build())
    return this
  }

  build () {
    return new Dependency(this.name, this.version, this.sections)
  }
}
