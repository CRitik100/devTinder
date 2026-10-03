const validator = require("validator");
const { User } = require("../models/user");
const Connection = require("../models/connection");

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

const validateConnectionRequest = async (req) => {
  const allowedStatus = ["ignored", "interested"];
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.connectionStatus;

  if (!allowedStatus.includes(status)) {
    throw new Error(`${status} request is not allowed.`);
  }

  const isUserInDB = await User.findById(toUserId);
  if (!isUserInDB) {
    throw new Error("sending the req to invalid user.");
  }
  req.toUser = isUserInDB;
  if (
    await Connection.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    })
  ) {
    throw new Error("Req has already been made.");
  }
};

const validateConnectionReview = (req) => {
  const { connectionStatus } = req.params;
  const allowedStatus = ["accepted", "rejected"];
  if (!allowedStatus.includes(connectionStatus)) {
    throw new Error(`${connectionStatus} is not allowed here.`);
  }
};

module.exports = {
  validateSignupData,
  validateUpdateProfileData,
  validateNewProfilePassword,
  validateConnectionRequest,
  validateConnectionReview,
};
