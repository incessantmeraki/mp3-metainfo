# mp3-metainfo
takes location of mp3 file as argument and returns an object meta information. 

## Usage

### Example
```js
  //example.js
  var mp3Metainfo = require('./index.js')

  var fullPath = __dirname + '/'+process.argv[2]
  var result = mp3Metainfo(fullPath)

  console.log (result)
```

### Output
copy any music(music.mp3) in the current directory and run

```sh
  $ node example.js music.mp3
  
    { song: 'Always In My Head',
      artist: 'Coldplay',
      album: 'Ghost Stories',
      year: '2014' }
```
## License

MIT
