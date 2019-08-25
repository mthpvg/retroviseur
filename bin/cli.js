#!/usr/bin/env node

const fs = require('fs')
const semver = require('semver')
const moment = require('moment')
const npmView = require('./lib/npm_view')
const help = require('./lib/help')
let hasNoNewReleases = true

const timeDictionary = {d: 'days', w: 'weeks'}

const count = parseInt(process.argv[2] || '2')
const unit = process.argv[3] || 'w'

if (!Number.isInteger(count)) return help()
if (!['d', 'w'].includes(unit)) return help()

let packageFile
try {
  packageFile = fs.readFileSync('./package.json', 'utf8')
} catch (err) {
  console.error('👻 --> There is no package.json.')
  throw(err)
}

let packageJson
try {
  packageJson = JSON.parse(packageFile)
} catch (err) {
  console.error(`👻 --> The package.json is invalid: ${err.message}`)
  throw(err)
}

const dependencies = packageJson.dependencies

console.log(`Releases in the last ${count} ${timeDictionary[unit]}:`)

Object.keys(dependencies)
    .forEach((depName) => {
      npmView(depName, function (err, result) {
        if (err) throw(err)
        const validVersions = Object.keys(result).map((version) => {
          const date = result[version]
          return {version, date, fromNow: moment(date).fromNow()}
        })
    .filter((elt) => {
      let isValid = false
      try {
        isValid = semver.satisfies(elt.version, dependencies[depName])
      } catch (err) {
        console.error(` 💥  ${depName}@${dependencies[depName]} a release has an invalid semver ${elt.version}`)
      }
      return isValid
    })
    .filter(function (elt) {
      return moment(elt.date).diff(moment().subtract(count, unit)) > 0
    })
    const finalResult = validVersions.map((elt) => {
      return {version: elt.version, fromNow: elt.fromNow}
    })

    if (finalResult.length) {
      hasNoNewReleases = false
      console.log(` ⚠️   ${depName}@${dependencies[depName]}`)
      finalResult.forEach((e) => {
        console.log(`      ${e.version}: ${e.fromNow}`)
      })
    }
  })
})

if (hasNoNewReleases) {
  console.log(' ℹ️   No new releases')
}
