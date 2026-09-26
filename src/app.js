const express = require("express");

const app = express();

app.listen(1111, () => {
  console.log("Server is Successfully listning to the PORT : 1111");
});

app.get("/user", (req, res) => {
  // Logic to fetch the user data from DB.
  console.log("Fetch the user Data.");
  res.send({
    firstName: "Vickey",
    lastName: "Chavan",
  });
});

app.post("/user", (req, res) => {
  // Logic the save the data to DB.
  console.log("Create the new user.");
  res.send("New user has been saved successfully..!!");
});

app.patch("/user", (req, res) => {
  //Logic the update the existing user Data.
  console.log("Update the users existing Data.");
  res.send("Updated the desired user data..!!");
});

app.delete("/user", (req, res) => {
  // logic to delete the user from the DB.
  console.log("Remove the user data from the DB");
  res.send("User data has been removed successfully..!!");
});

// The use function is accpting all the request whether it is GET, POST, PUT, DELETE, PATCH, etc.
app.use("/user", (req, res) => {
  res.send("Are you ready...?");
});
