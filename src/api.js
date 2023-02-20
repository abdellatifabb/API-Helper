const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser')

const request = require('request');

const app = express();
const router = express.Router();

var jsonParser = bodyParser.json()
app.use(express.json({limit: '50mb'}));

// app.use(bodyParser.json({limit: '100mb'}));

router.get('/', (req, res) => {
    res.json({
        'hello': 'Index page'
    });
});

router.get('/another', (req, res) => {
    res.json({
        'hello': 'Another page'
    });
});

router.post('/uploadfile',jsonParser, (req, res) => {
    var options = {
      'method': 'POST',
      'url': 'https://upload.api.synthesia.io/v2/scriptAudio',
      'headers': {
        'Authorization': '35b071223a6953d5ac60714f8a386de3',
        'Content-Type': 'audio/mpeg',
        'accept': 'application/json'
      },
      body:`data:audio/mpeg;name=botoxforpain.mp3;base64,${req.body.file}`
    
    };
    request(options, function (error, response) {
    
      if (error) throw new Error(error);
      res.send(response.body)
      console.log(response.body);
    });
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);