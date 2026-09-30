const express = require("express");
const { connectDB } = require("./config/database");
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
  // creating a document by creating an instance of User model and passing the data to it.
  const userData = new User(req.body);
  let opts = {
    returnDocument: "after",
    runValidators: true,
  };
  try {
    if (userData?.skills && userData?.skills.length > 5) {
      throw new Error(`Max 5 Skills can be added..!!`);
    }
    await userData.save(); // This will save the document in the collection.
    res.send("User has been added successfully..!!");
  } catch (error) {
    console.log(`Error while saving the new user Data..!! ${error.message}`);
    res.send("Error while creating the new user..!! \n" + error.message);
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
  let allowedUpdate = ["password", "age", "skills", "photo"];
  let userId = req.params?.userId;
  let data = req.body;
  let opts = {
    returnDocument: "after",
    runValidators: true,
  };
  let check = Object.keys(data).every((k) => allowedUpdate.includes(k));
  try {
    if (!check) {
      throw new Error(`allowed updates => ${allowedUpdate.join(", ")}.`);
    }
    if (data?.skills && data?.skills.length > 5) {
      throw new Error(`Max 5 Skills can be added..!!`);
    }
    const updateUserData = await User.findByIdAndUpdate(userId, data, opts);
    res.send("User data has been updated successfully..!!");
    console.log(
      `User data has been updated successfully..!! ${updateUserData}`,
    );
  } catch (error) {
    console.log("Something went wrong...!!!" + error);
    res.send("Failed to update, " + error.message);
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
