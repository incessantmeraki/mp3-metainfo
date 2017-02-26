var fs = require('fs')

module.exports = mp3_metainfo 

function mp3_metainfo (fullPath) {
  var lastBytes = last_bytes(fullPath)

  var result = []
  for (var i = 0; i < lastBytes.length; i++) {
  if (charDetect(lastBytes.charAt(i)) !== null) 
    result.push(lastBytes.charAt(i))
  }
  
  var pvts = pivots(result)
  var m = pvts[0]
  var n = pvts[1]
  var o = pvts[2]

  var metaString = result.join('')
  var metaObject = {}
  var song = metaString.substring(3,m) 
  metaObject.song = song
  var artist = metaString.substring(m,n)
  metaObject.artist = artist
  var album = metaString.substring(n,o)
  metaObject.album = album
  var year = metaString.substring(o,o+4)
  metaObject.year = year
  
  return metaObject
}

function last_bytes(fullPath) {
  var musicFile = fs.readFileSync(fullPath)
  var musicInfo = Buffer.allocUnsafe(128)

  var noBytes = fs.statSync(fullPath).size
  var startOffset = noBytes - 128

  musicFile.copy(musicInfo, 0, startOffset, noBytes) 
  return musicInfo.toString()
}

function pivots (result) {
  var output = []
  var prev = charDetect(result[3]) 
  var j = -1
  for (var i = 4; i < result.length; i++) {
    var code = charDetect(result[i])
    if ( (prev === -1) && (code === 1) ) {
      output[++j] = i
    }
    if(prev === -1 && code === 0) { 
      if(result[i] !== ' '){ 
        output[++j] = i
      }
    }
    prev = code
  }
  return output
}


function charDetect(str) {
  var c = str.charAt(0) 
  //console.log(c)
  if (c >= 'A' && c <= 'Z') return 1;
  if (c >= 'a' && c <= 'z') return -1;
  if ((c >= '0' && c <= '9') || c ==' ') return 0;
  return null;
}



