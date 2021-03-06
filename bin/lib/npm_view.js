const spawn = require('child_process').execSync
const JSON5 = require('json5')

module.exports = function npmView (packageName, callback) { 
  const rawSight = spawn(`npm view ${packageName} time`, {encoding: 'utf8'})
  let sight
  try { 
    sight = JSON5.parse(rawSight)
  } catch (err) { 
    return callback(err)
  } 
  delete sight.modified 
  delete sight.created 
  return callback(null, sight) 
}
