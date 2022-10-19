/*
  File name:      book.js
  Student’s Name: LAU, Wai Yung
  Student ID:     301269737
  Date:           18 Oct 2022
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Book = require("../models/book");

var mysort = { last_name: 1 };

module.exports.displayBookList = (req, res, next) => {
  //Book.find((err, bookList) => {
  Book.find().sort(mysort).exec((err, bookList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(bookList);

      //res.render("book/list", { title: "Books", BookList: bookList });
      res.render("book/list", { 
        title: "Business Contact", 
        BookList: bookList,
        displayName: req.user ? req.user.displayName : "",
      });
      //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("book/add", {
    title: "Add Business Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newBook = Book({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  Book.create(newBook, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/book-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Book.findById(id, (err, booktoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("book/edit", { 
        title: "Update Business Contact", 
        book: booktoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebook = Book({
    _id: id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  Book.updateOne({ _id: id }, updatebook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/book-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/book-list");
    }
  });
};
