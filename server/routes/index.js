let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomepage);

/* GET home page. */
router.get("/home", indexController.displayHomepage);

/* GET About Us page. */
router.get("/about", indexController.displayaboutpage);

/* GET Products page. */
router.get("/products", indexController.displayproductpage);

/* GET Projects page. */
router.get("/projects", indexController.displayproductpage);

/* GET Services page. */
router.get("/services", indexController.displayservicespage);

/* GET Services page. */
router.get("/services_p", indexController.displayservicesppage);

/* GET Services page. */
router.get("/services_w", indexController.displayserviceswpage);

/* GET Services page. */
router.get("/services_g", indexController.displayservicesgpage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactpage);

/* GET Route for displaying the Login page */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post("/register", indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);

module.exports = router;
