import {toPairs} from 'lodash'
import {Dependency, DependenciesGroupedByName} from './dependency'
import async from 'async'

export function dependencyTreeLint (packageJson, result) {
  let all = []
  let queue = async.queue((task, done) => markVersionForDependencies(task, done))

  queue.drain = () => {
    result(all)
  }

  queue.push({all: all, packageJson: packageJson, group: 'dependencies'})
  queue.push({all: all, packageJson: packageJson, group: 'devDependencies'})
}

function markVersionForDependencies (task, done) {
  let dependencies = toPairs(task.packageJson[task.group])
  let markedDependencies = markVersionForDependenciesForGroup(dependencies, task.group)

  task.all.push(markedDependencies)

  done()
}

function markVersionForDependenciesForGroup (dependencies, groupName) {
  let markedDependencies = dependencies.map(pair => {
    const [name, version] = pair
    return new Dependency(name, version)
  })
  return new DependenciesGroupedByName(groupName, markedDependencies)
}
