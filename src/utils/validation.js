const validator = require("validator");

const validateSignupData = (req) => {
  const { emailId, password } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid emailId.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password.");
  }
};

const validateUpdateProfileData = (req) => {
  const data = req.body;
  const allowedUpdate = [
    "firstName",
    "lastName",
    "about",
    "age",
    "skills",
    "photo",
  ];

  let check = Object.keys(data).every((k) => allowedUpdate.includes(k));

  if (!check) {
    throw new Error(`allowed updates are ${allowedUpdate.join(", ")}.`);
  } else if (data?.skills && data?.skills.length > 5) {
    throw new Error(`Max 5 Skills can be added..!!`);
  }
};

const validateNewProfilePassword = async (req) => {
  const user = req.user;
  const newPassword = req.body.newPassword;

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Enter a strong password.");
  } else if (await user.isPasswordValid(newPassword)) {
    throw new Error("This is old password");
  }
};

module.exports = {
  validateSignupData,
  validateUpdateProfileData,
  validateNewProfilePassword,
};
