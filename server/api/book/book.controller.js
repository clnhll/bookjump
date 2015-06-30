'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var google = require('googleapis');
var books = google.books('v1');

var API_KEY = 'AIzaSyCp6TeBmn43CwAoM-_E8judP6-LuUoiAuo'; // specify your API key here

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};
exports.indexUser = function(req, res) {
  Book.find({owner: req.params.id}, function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};
exports.search = function(req, res) {
  books.volumes.list({
    auth: API_KEY,
    q: req.params.search
  }, function(err, data) {
    var newBook = {
      title: data.items[0].volumeInfo.title,
      owner: req.params.id,
      cover: data.items[0].volumeInfo.imageLinks === undefined ? '' : data.items[0].volumeInfo.imageLinks.thumbnail,
      requested: false
    }
    Book.create(newBook, function(err, book) {
      if(err) { return handleError(res, err); }
      return res.json(201, book);
    });
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.json(201, book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.requested = book.requested ? false : true;
    //var updated = _.merge(book, req.body);
    book.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
