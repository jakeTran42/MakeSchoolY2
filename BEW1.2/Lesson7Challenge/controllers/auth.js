// const jwt = require('jsonwebtoken')
const User = require('../models/user.js');
// require('dotenv').config();

module.exports = (app) => {
  // Get form
  app.get('/sign-up', (req, res) => {
    res.render('sign-up');
  });


}