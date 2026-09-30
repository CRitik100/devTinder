const express = require("express");
const { connectDB } = require("./config/database");
const bcrypt = require("bcrypt");

const {
  validateSignupData,
  validateUserUpdateData,
} = require("./utils/validation");
const { User } = require("./models/user");

const app = express();

connectDB()
  .then(() => {
    console.log("DB is connected..🚀");
    app.listen(1111, () => {
      console.log("Server is Successfully listning to the PORT : 1111");
    });
  })
  .catch((err) => {
    console.log(`DB connection is failed..🥶 ${err.message}`);
  });

app.use(express.json());

// POST "signup" API
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    const hashedPassword = await bcrypt.hash(password, 11);

    const userData = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPassword,
    });
    await userData.save();
    res.send("User has been added successfully..✔️");
  } catch (error) {
    res.send("Error => " + error.message);
  }
});

// GET -> login API.
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Credentials are not valid");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Credentials are not valid");
    } else {
      res.send("LoggedIn Succussfully..✔️");
    }
  } catch (error) {
    res.send("Error => " + error.message);
  }
});

// GET "feed" API -> Suggestions to user to connect with others.
app.get("/feed", async (req, res) => {
  try {
    const data = await User.find().exec();
    if (!data) {
      res.status(404).send("Relvent users not found 🤔...!!");
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log("Something went wrong...!!");
  }
});

// GET "user" API -> By emailId getting the user details.
app.get("/user", async (req, res) => {
  const userEmail = req.body;
  try {
    const data = await User.findOne(userEmail).exec();
    if (!data) {
      res.status(404).send("User not found 🤔...!!");
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log("Something went wrong...!!!" + error);
    res.status(500).send("Something went wrong.");
  }
});

// PATCH "user" API -> Update the user data by user userId;
app.patch("/user/:userId", async (req, res) => {
  let userId = req.params?.userId;
  let data = req.body;
  let opts = { returnDocument: "after", runValidators: true };
  try {
    validateUserUpdateData(req);
    const updateUserData = await User.findByIdAndUpdate(userId, data, opts);
    res.send("User data has been updated successfully..!!");
    console.log(
      `User data has been updated successfully..!! ${updateUserData}`,
    );
  } catch (error) {
    console.log("Something went wrong...!!!" + error);
    res.send("Error => " + error.message);
  }
});

// Delete "user" API -> Delete the user by user emailId;
app.delete("/user", async (req, res) => {
  let user = req.body;
  try {
    if (!(await User.findOne(user))) {
      res.status(400).send("user is not present!");
    } else {
      await User.findOneAndDelete(user);
      res.send("user has been deleted succufully.");
    }
  } catch (error) {
    console.log("Something went wrong...!!!" + error);
    res.status(500).send("Something went wrong.");
  }
});
