var express = require('express');
var request = require('request');
var mysql = require('./dbcon.js');
var nodemailer = require('nodemailer');
var inlineCss = require('nodemailer-juice');

var mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "capstoneCS467@gmail.com",
    pass: "o11iepo11ie"
  }
});

mailer.use('compile', inlineCss())

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

// mail routes
api.get('/sendWeekly', function(req, res, next) {
  var name = req.query.owner_name;
  var date = req.query.creation_time;
  var sender = req.query.who_created;
  var owner = req.query.owner;

  var weeklyMail = {
    from: "employerWeekly",
    to: owner,
    subject: "You Have Been Selected as Employee of the Week!",
    html: '<div style="width:768px;height:576px;margin:0 auto;"><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:576px;display:inline-block;"><img src="cid:unique@tweek.jpg" width="768px" /></div></div><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:100px;display:inline-block;margin-top:425px;margin-left:145px;"><h4>' + sender + '</h4></div></div><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:100px;display:inline-block;margin-top:425px;margin-left:525px;"><h4>' + date + '</h4></div></div><div style="max-height:0;max-width:0;overflow:visible"><div style="width:768px;height:100px;margin-top:230px;display:inline-block;text-align:center;"><h2>' + name + '</h2></div></div></div>',
    attachments: [{
      filename: 'week.jpg',
      path: 'public/files/week.jpg',
      cid: 'unique@tweek.jpg'
    }]
  };

  mailer.sendMail(weeklyMail, function(error, response) {
    if (error) { console.log(error) };
    res.json({message : "mail successfully sent!"});
  });
});

api.get('/sendMonthly', function(req, res, next) {
  var name = req.query.owner_name;
  var date = req.query.creation_time;
  var sender = req.query.who_created;
  var owner = req.query.owner;

  var monthlyMail = {
    from: "employerMonthly",
    to: owner,
    subject: "You Have Been Selected as Employee of the Month!",
    html: '<div style="width:768px;height:593px;margin:0 auto;"><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:576px;display:inline-block;"><img src="cid:unique@tmonth.jpg" width="768px" /></div></div><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:100px;display:inline-block;margin-top:445px;margin-left:200px;"><h4>' + sender + '</h4></div></div><div style="max-height:0;max-width:0;overflow:visible;"><div style="width:768px;height:100px;display:inline-block;margin-top:445px;margin-left:495px;"><h4>' + date + '</h4></div></div><div style="max-height:0;max-width:0;overflow:visible"><div style="width:768px;height:100px;margin-top:325px;display:inline-block;text-align:center;"><h2>' + name + '</h2></div></div></div>',
    attachments: [{
      filename: 'month.jpg',
      path: 'public/files/month.jpg',
      cid: 'unique@tmonth.jpg'
    }]
  };

  mailer.sendMail(monthlyMail, function(error, response) {
    if (error) { console.log(error) };
    res.json({message : "mail successfully sent!"});
  });
});

module.exports = api;
