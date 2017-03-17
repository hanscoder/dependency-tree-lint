import {Dependency} from './dependency'
import {describe, it} from 'mocha'
import {expect} from 'chai'

describe('Dependency', () => {
  it('should have a non-release version', () => {
    let dependency = new Dependency('dependency', '^1.1.1')

    let nonRelease = dependency.isNonRelease()
    expect(nonRelease).to.be.true // eslint-disable-line no-unused-expressions
  })

  it('should have a release version', () => {
    let dependency = new Dependency('dependency', '1.1.1')

    expect(dependency.isNonRelease()).to.be.false // eslint-disable-line no-unused-expressions
  })
})
