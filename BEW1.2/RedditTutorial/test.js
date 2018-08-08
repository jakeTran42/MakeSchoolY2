var express = require('express');
var app = express();

// Middlewares
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/hello-world', function (req, res) {
  res.send('Hello World');
});

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
