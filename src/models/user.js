const mongoose = require("mongoose");
const validator = require("validator");

// This is the Schema, which defines the structure of the document in the collection. It is like a blueprint of the document.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "user first Name is mandatory"],
      minLength: [3, "Min length of first name should be 3."],
      maxLength: [50, "Max length of first name should be 50."],
      trim: true,
    },
    lastName: {
      type: String,
      minLength: [2, "Min length of last name should be 2."],
      maxLength: [50, "Max length of last name should be 50."],
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
      default: "https://www.example.com",
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: (props) => `Invalid URL : ${props.value}`,
      },
    },
  },
  {
    timestamps: true,
  },
);

// This is the model, which will take the Schema and help to perform the actions on DB like Create, Read, Update, Delete (CRUD) operations.
const User = mongoose.model("User", userSchema);

module.exports = { User };
