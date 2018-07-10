const express = require('express')
var exphbs  = require('express-handlebars');
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Lesson7Challenge', { useMongoClient: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('helper'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})