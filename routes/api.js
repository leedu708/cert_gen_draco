var express = require('express');
var request = require('request');
var mysql = require('./dbcon.js');

var api = express.Router();

// user routes
api.get('/users', function(req, res, next) {
  mysql.pool.query("SELECT * FROM users", function(err, result) {
    res.json(result);
  })
})

api.get('/user/:email', function(req, res, next) {
  var createString = 'SELECT * FROM users WHERE email=\"' + req.params.email + '\"';
  mysql.pool.query(createString, function(err, result) {
    res.json(result);
  });
});

// award routes

// grab all awards
api.get('/awards', function(req, res, next) {
  // var createString = 'SELECT owner, owner_name, who_created, award_types.full_name ' +
  //                    'FROM awards INNER JOIN awards.awards_type=awardtypes.type_id'

  var createString = 'SELECT * FROM awards';
  mysql.pool.query(createString, function(err, result) {
    res.json(result);
  });
});

// grab award based on owner email
api.get('/user-awards/:email', function(req, res, next) {
  var createString = 'SELECT award_types.full_name, who_created, creation_time ' +
                     'FROM awards INNER JOIN awards.awards_type=award_types.type_id ' +
                     'WHERE owner=\"' + req.params.email + '\"';

  console.log(createString);
  mysql.pool.query(createString, function(err, result) {
    res.json(result);
  })
})

module.exports = api;
