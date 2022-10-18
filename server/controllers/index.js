let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//create the user model instance
let userModel = require("../models/user");
let User = userModel.User; //alias

module.exports.displayHomepage = (req, res, next) => {
  res.render("index", { title: "Home" });
};

module.exports.displayaboutpage = (req, res, next) => {
  res.render("index", { title: "About Me" });
};

module.exports.displayproductpage = (req, res, next) => {
  res.render("index", { title: "Products" });
};

module.exports.displayproductpage = (req, res, next) => {
  res.render("index", { title: "Projects" });
};

module.exports.displayservicespage = (req, res, next) => {
  res.render("index", { title: "Services", tab: "General Programming" });
};

module.exports.displayservicesppage = (req, res, next) => {
  res.render("index", { title: 'Services', tab: "General Programming" });
};

module.exports.displayserviceswpage = (req, res, next) => {
  res.render("index", { title: 'Services', tab: "Web Development" });
};

module.exports.displayservicesgpage = (req, res, next) => {
  res.render("index", { title: 'Services', tab: "Graphic Design" });
};

module.exports.displayContactpage = (req, res, next) => {
  res.render("index", { title: "Contact Me" });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  console.log("HIHIHIHIHIHIHIHIHIH");
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    console.log("In Authentication process!!!")
    if (err) {
      console.log("process login page error!!")
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      console.log("In Authentication ERROR!!!")
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/book-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/book-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
