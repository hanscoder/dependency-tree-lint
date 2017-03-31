import { clean } from 'semver'

const NON_RELEASE = 'NON-RELEASE'
const RELEASE = 'RELEASE'

export class Dependency {
  constructor (name, version, sections) {
    this.name = name
    this.version = version.trim()
    this.state = clean(version.trim()) !== null ? RELEASE : NON_RELEASE
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
    this.name = name
    this.dependencies = dependencies
  }

  hasAtLeastOneNonRelease () {
    return this.dependencies
      .find(dependency => dependency.isNonRelease())
  }

  forEachDependency (callback) {
    this.dependencies.forEach(dependency => callback(dependency))
  }
}
