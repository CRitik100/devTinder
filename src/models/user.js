const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This is the Schema, which defines the structure of the document in the collection. It is like a blueprint of the document.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "user first Name is mandatory"],
      minLength: [3, "Min length of first name should be 3."],
      maxLength: [11, "Max length of first name should be 11."],
      trim: true,
      match: [/^[a-zA-Z]+$/, "It can only contain letters."],
    },
    lastName: {
      type: String,
      minLength: [2, "Min length of last name should be 2."],
      maxLength: [11, "Max length of last name should be 11."],
      match: [/^[a-zA-Z]+$/, "It can only contain letters."],
    },
    emailId: {
      type: String,
      required: [true, "use emailId is mandatory"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Entered email is not a valid.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is mandatory."],
      validate: {
        validator: function (v) {
          return validator.isStrongPassword(v);
        },
        message: `enter a strong Password.\n`,
      },
    },
    age: {
      type: Number,
      min: [15, "Min age can be 15."],
      max: [70, "Max age can be 70."],
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "others"],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((skill) => skill.length < 11);
        },
        message: "each skill must be at most 10 characters long.",
      },
    },
    photo: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: (props) => `Invalid URL : ${props.value}`,
      },
    },
    about: {
      type: String,
      max: [150, "Max allowed char can be 150."],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getHashedPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 11);
  return hashedPassword;
};

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, "devTinder", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.isPasswordValid = async function (enteredPassword) {
  const user = this;
  if (typeof enteredPassword !== "string") return false;
  const check = await bcrypt.compare(enteredPassword, user.password);
  return check;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
