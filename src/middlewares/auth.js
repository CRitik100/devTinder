const adminAuth = (req, res, next) => {
  const logInToken = "admin";
  if (logInToken == "admin") {
    console.log("Authorized Admin user.");
    next();
  } else {
    res.status(401).send("Unauthorized User...!!!");
  }
};

const externalAuth = (req, res, next) => {
  const logInToken = "external";
  if (logInToken == "external") {
    console.log("Authorized External user.");
    next();
  } else {
    res.status(401).send("Unauthorized user..!!");
  }
};

module.exports = { adminAuth, externalAuth };
