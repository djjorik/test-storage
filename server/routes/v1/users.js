var mongoose = require('mongoose');
var User = require('../../models/User.js');

var users = {
 
  /* 
   * Get all users 
   * 
   */
  getAll: function(req, res) {
    User.find(function (err, users) {
      if (err) return err; // TODO check proper error handling
      res.json(users);
    }); 
  },
 
  /* 
   * Get single user 
   * 
   */

  getOne: function(req, res) {
    // TODO check params
    // req.checkParams("_id").isArray();
     User.findById(req.params.id, function (err, user) {
      if (err) return err; // TODO check proper error handling
      res.json(user);
    });
  },
 
  /* 
   * Create user 
   * 
   */

  create: function(req, res) {
    User.create(req.body, function (err, user) {
      if (err) return err;
      res.json(user);
    });
  },

  /* 
   * Update user 
   * 
   */
 
  update: function(req, res) {
    // TODO need security check (user input) for update
    User.findById( req.params.id, function (err, user){
     
     user.name = req.body.name;
     user.description = req.body.description;
     user.prerequisites = req.body.prerequisites;
     user.environment = req.body.environment;
     // user.users = req.body.userss; // add userss to suite
     user.updated = Date.now();

     user.save( function ( err, user, count ){
      if (err) return err; // TODO check proper error handling
      res.json(user);
     });
    });
  },

  /* 
   * delete user 
   * 
   */
 
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return err;
      res.json(true);
    });
  }
};

module.exports = users;