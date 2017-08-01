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
  var createString = 'SELECT owner, owner_name, who_created, full_name as type ' +
                     'FROM awards INNER JOIN award_types ON awards.awards_type=award_types.type_id';

  mysql.pool.query(createString, function(err, result) {
    res.json(result);
  });
});

// grab award based on creator's email
api.get('/user-awards/:email', function(req, res, next) {
  var createString = 'SELECT full_name as type, owner, owner_name, who_created, creation_time ' +
                     'FROM awards INNER JOIN award_types ON awards.awards_type=award_types.type_id ' +
                     'WHERE who_created=\"' + req.params.email + '\"';
                     
  mysql.pool.query(createString, function(err, result) {
    res.json(result);
  })
})

module.exports = api;
