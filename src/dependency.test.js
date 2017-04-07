import { Dependency, Section } from './dependency'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('Dependency', () => {
  it('should have as default unknown section as name', () => {
    let dependency = asDependency().build()

    expect(dependency).to.have.property('name', 'unknown dependency')
  })

  it('should have a name', () => {
    let dependency = asDependency('development').build()

    expect(dependency).to.have.property('name', 'development')
  })

  it('should have as default unknow version as version', () => {
    let dependency = asDependency().build()

    expect(dependency).to.have.property('version', 'unknown version')
  })

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

describe('Section', () => {
  it('should have as default unknown section as name', () => {
    let section = asSection().build()

    expect(section).to.have.property('name', 'unknown section')
  })

  it('should have a name', () => {
    let section = asSection('development').build()

    expect(section).to.have.property('name', 'development')
  })

  it('should have as default empty dependencies', () => {
    let section = asSection('development').build()

    expect(section).to.have.property('dependencies').that.eql([])
  })

  it('can have at least one dependency with a nonrelease version', () => {
    let section = asSection('dependency')
      .withDependency(asDependency('dependency1').asRelease())
      .withDependency(asDependency('dependency').asNonRelease())
      .withDependency(asDependency('dependency2').asRelease())
      .build()

    let hasAtLeastOneNonRelease = section.hasAtLeastOneNonRelease()

    expect(hasAtLeastOneNonRelease).to.be.true // eslint-disable-line no-unused-expressions
  })

  it('can have dependencies with just lease version', () => {
    let section = asSection('dependency')
      .withDependency(asDependency('dependency1').asRelease())
      .withDependency(asDependency('dependency').asRelease())
      .withDependency(asDependency('dependency2').asRelease())
      .build()

    let hasAtLeastOneNonRelease = section.hasAtLeastOneNonRelease()

    expect(hasAtLeastOneNonRelease).to.be.false // eslint-disable-line no-unused-expressions
  })

  it('should provide each dependency', () => {
    let section = asSection('dependency')
      .withDependency(asDependency('dependency1').asRelease())
      .withDependency(asDependency('dependency').asRelease())
      .withDependency(asDependency('dependency2').asRelease())
      .build()

    let providedDependencies = []
    section.forEachDependency(dependency => providedDependencies.push(dependency))

    expect(providedDependencies).eql(section.dependencies)
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
    if (this.dependencies !== []) {
      return new Section(this.name, this.dependencies)
    }

    return new Section(this.name)
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
