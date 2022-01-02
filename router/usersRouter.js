//externalImports
const express = require("express");

//internal Imports
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/common/users/avatarUpload");
const {
  addUsersValidators,
  addUsersValidatorHandler,
} = require("../middlewares/common/users/usersValidator");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUsersValidators,
  addUsersValidatorHandler,
  addUser
);

module.exports = router;
