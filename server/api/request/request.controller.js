'use strict';

var _ = require('lodash');
var Request = require('./request.model');

// Get list of requests
exports.index = function(req, res) {
  Request.find(function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};

// Get list of requests for a user
exports.indexUser = function(req, res) {
  Request.find({ownerid:req.params.id}, function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};
exports.myReq = function(req, res) {
  Request.find({requesterid:req.params.id}, function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};

// Get a single request
exports.show = function(req, res) {
  Request.findById(req.params.id, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    return res.json(request);
  });
};

// Creates a new request in the DB.
exports.create = function(req, res) {
  Request.create(req.body, function(err, request) {
    if(err) { return handleError(res, err); }
    return res.json(201, request);
  });
};

// Updates an existing request in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Request.findById(req.params.id, function (err, request) {
    if (err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    request.approved = request.approved ? false : true;
    request.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, request);
    });
  });
};

// Deletes a request from the DB.
exports.destroy = function(req, res) {
  Request.findById(req.params.id, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    request.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
