/*
  File name:      book.js
  Student’s Name: LAU, Wai Yung
  Student ID:     301269737
  Date:           18 Oct 2022
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let bookModel = mongoose.Schema(
  {
    //name: String,
    //author: String,
    //published: String,
    //description: String,
    //price: Number,
    first_name: String,
    last_name: String,
    contact_number: Number,
    email: String,
  },

  {
    //collection: "books",
    collection: "biz_contact",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("Book", bookModel);
