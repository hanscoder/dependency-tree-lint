import { clean } from 'semver'

const NON_RELEASE = 'NON-RELEASE'
const RELEASE = 'RELEASE'

export class Dependency {
  constructor (name, version, sections) {
    this.name = name !== undefined ? name : 'unknown dependency'
    this.version = version !== undefined ? version.trim() : 'unknown version'
    this.state = clean(this.version) !== null ? RELEASE : NON_RELEASE
    this.sections = sections !== undefined ? sections : []
  }

  isNonRelease () {
    return this.state === NON_RELEASE
  }

  hasAtLeastOneDependencyWithNonRelease () {
    let sectionWithAtLeastOneNonRelease = this.sections
      .find(section => section.hasAtLeastOneNonRelease())

    return sectionWithAtLeastOneNonRelease !== undefined
  }

  forEachSection (callback) {
    this.sections.forEach(section => callback(section))
  }
}

export class Section {
  constructor (name, dependencies) {
    this.name = name !== undefined ? name : 'unknown section'
    this.dependencies = dependencies !== undefined ? dependencies : []
  }

  hasAtLeastOneNonRelease () {
    let dependency = this.dependencies
      .find(dependency => dependency.isNonRelease())

    return dependency !== undefined
  }

  forEachDependency (callback) {
    this.dependencies.forEach(dependency => callback(dependency))
  }
}
