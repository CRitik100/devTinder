const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Unauthrized user.");
    }
    const { userId } = jwt.verify(token, process.env.JWT_TOKEN);
    const userData = await User.findById(userId);
    if (userData) {
      req.user = userData;
      next();
    } else {
      throw new Error("user does not exist.");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { userAuth };
