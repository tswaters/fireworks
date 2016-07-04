
'use strict'

const exec = require('child_process').execSync
const semverBumper = require('semver-bumper')

const out = exec('git diff-index --name-only HEAD --')
if (out.length > 0) {
  console.error('Could not publish, working directory not clean')
  process.exit(1)
}

let releaseCommitted = false
let releaseTagged = false
let releaseCommitPushed = false
let releaseTagPushed = false

try {

  exec('git pull origin master')

  const retCode = semverBumper(process.argv.slice(2)[0])
  if (retCode !== 0) {
    throw new Error('Problem updating version')
  }

  const packageJson = require('../package')

  exec(`git commit -am "Release v${packageJson.version}"`)
  releaseCommitted = true

  exec(`git tag v${packageJson.version}`)
  releaseTagged = true

  exec('git push origin master')
  releaseCommitPushed = true

  exec(`git push origin v${packageJson.version}`)
  releaseTagPushed = true

  exec('npm publish')

}
catch (e) {

  console.error('Something blew up, attempting to revert changes')
  console.error(e)

  if (releaseCommitted) {
    exec('git reset --hard HEAD~1')
  }

  if (releaseTagged) {
    exec(`git tag -d v${packageJson.version}`)
  }

  if (releaseCommitPushed) {
    exec('git push --force')
  }

  if (releaseTagPushed) {
    exec(`git push origin :v${packageJson.version}`)
  }

}



