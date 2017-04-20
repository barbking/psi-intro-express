var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var songData = [
  {name: 'shake it off'},
  {name: 'river'}
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', function(req, res) {
//   res.send(path.join(__dirname, 'public/index.html'));
// });

app.get('/song', function(req, res) {
  console.log('in song get');
  // res.status(200).send(JSON.stringify(songData));
  res.status(200).send(songData);
});

app.post('/song', function(req, res) {
  console.log('in song post', req.body);
  var song = req.body;
  var status = 0;
  var bool = true;
  for (var i = 0; i < songData.length; i++) {
    if(songData[i].name === song.songName){
      bool = false;
    }
  }
  if(bool && song.songName !== ""){
    songData.push({name: song.songName});
    status = 200;
    console.log(songData, 'if');
  }
  else{
    status = 400;
    console.log(songData , 'else');
  }

  // $('.container').append('<p>' + req.body.songName + '</p>');
  // res.write('<p>' + req.body.songName + '</p>');
  res.sendStatus(status);
});

app.listen(3001, function() {
  console.log('listening on port 3001');
});
