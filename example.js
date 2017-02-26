var mp3Metainfo = require('./index.js')

var fullPath = __dirname + '/'+process.argv[2]
var result = mp3Metainfo(fullPath)

console.log (result)
