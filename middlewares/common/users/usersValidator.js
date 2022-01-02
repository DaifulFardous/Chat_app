//external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

//add user
const addUsersValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than Alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email is already use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile Number Must be valid Bangladeshi Mobile Number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must have 8 characters & should contain at least 1 uppercase, 1 lowercase and 1 symbol"
    ),
];

const addUsersValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  /*
    mappederrors = {
        name: {
            msg: "Name is required"
        },
        email: {
            msg: "Invalid email"
        }
    };
   */
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //remove upload files
    if (req.files.length > 0) {
      const { fileName } = req.files[0];
      unlink(
        path.join(__dirname, `../../../public/uploads/avatars/${fileName}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    //response errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUsersValidators,
  addUsersValidatorHandler,
};
