// packages
const fs = require('fs');
const path = require('path')
var readline = require('readline');

var highland = require('highland');
const express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const cors = require('cors');

//cors options
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


const server = express();
server.use(cors(corsOptions));


function processFile(inputFile) {
    var instream = highland(fs.createReadStream(inputFile)),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        console.log(line);
    });

    rl.on('close', function (line) {
        console.log(line);
        console.log('done reading file.');
    });
}



server.post('/upload', upload.single('myFile'), (req, res) => {
    let data = processFile(req.file.path)
    console.log('da data _> ', data);
    res.json({success: true, data: data });

})

server.listen(8000, () => {
  console.log('Server started!');
});
