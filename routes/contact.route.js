const express = require("express");
const isLoggedIn = require("../middleware/auth.js");
const contactController = require("../controller/contact.controller.js");
const router = express.Router();

router.post("/create", contactController.contact);
router.get("/get-all-contacts", contactController.getAllContacts);
router.get("/single-contact/:id", contactController.getSingleUser);
router.put("/update-contact/:id", contactController.singleUpdateUser);
router.delete("/delete-contact/:id", contactController.singleDeleteUser);
router.delete("/delete-all-contact", contactController.deleteAllContacts);

module.exports = router;
