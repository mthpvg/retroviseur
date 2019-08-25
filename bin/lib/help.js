module.exports = function help() {
  console.log('👋 --> Welcome to retroviseur.')
  console.log(`📖 --> Usage:`)
  console.log(`📖     - Without options: retroviseur`)
  console.log(`📖       It outputs new compatible releases of your package,json dependencies that were released in the last 2 weeks.`)
  console.log(`📖     - With options: retroviseur 4 w`)
  console.log(`📖       It outputs new compatible releases that were released in the last 4 weeks.`)
  console.log(`📖     - With options: retroviseur 2 d`)
  console.log(`📖       It outputs new compatible releases that were released in the last 2 days.`)
}
