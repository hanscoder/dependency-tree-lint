import {toPairs} from 'lodash'
import {Dependency, Section} from './dependency'
import async from 'async'

export function dependencyTreeLint (packageJson, result) {
  let sections = []
  let queue = async.queue((task, done) => loadSection(task, done))

  queue.drain = () => {
    result(new Dependency(packageJson.name, packageJson.version, sections))
  }

  queue.push({sections: sections, packageJson: packageJson, section: 'dependencies'})
  queue.push({sections: sections, packageJson: packageJson, section: 'devDependencies'})
}

function loadSection (task, done) {
  let dependencies = toPairs(task.packageJson[task.section])
  let section = mapDependenciesIntoSection(dependencies, task.section)

  task.sections.push(section)

  done()
}

function mapDependenciesIntoSection (dependencies, name) {
  let markedDependencies = dependencies.map(pair => {
    const [name, version] = pair
    return new Dependency(name, version)
  })
  return new Section(name, markedDependencies)
}
