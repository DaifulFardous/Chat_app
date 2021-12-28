//externalImports
const express = require("express");

//internal Imports
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
