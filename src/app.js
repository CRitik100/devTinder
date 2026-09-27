const express = require("express");
const { adminAuth, externalAuth } = require("./middlewares/auth");

const app = express();

app.listen(1111, () => {
  console.log("Server is Successfully listning to the PORT : 1111");
});

// The use function is accpting all the request whether it is GET, POST, PUT, DELETE, PATCH, etc.
app.use("/admin", adminAuth);

app.get("/admin/user/:userId/img{.:ext}/*imgPath", (req, res) => {
  // Logic to fetch the user data from DB.
  console.log("Fetch the user Data.");
  res.send({
    firstName: "Vickey",
    lastName: "Chavan",
    userId: req.params.userId, // Named Parameter
    optionalSegments: req.params.ext, // Optional Segments
    imgPath: req.params.imgPath, // Wildcard Parameter
    queryParameter: req.query, // Query Parameter
  });
});

app.post("/admin/user", (req, res) => {
  // Logic the save the data to DB.
  res.send("New data has been saved successfully..!!");
});

app.patch("/admin/user", (req, res) => {
  //Logic the update the existing user Data.
  console.log("Update the users existing Data.");
  res.send("Updated the desired user data..!!");
});

app.delete("/admin/user", (req, res) => {
  // logic to delete the user from the DB.
  console.log("Remove the data from the DB");
  res.send("Data has been removed successfully..!!");
});

app.get("/external/user", externalAuth, (req, res) => {
  console.log("This is External User.");
  // if some error occured then ideally it should be handled with try and catch block.
  throw new Error("Something went wrong");
  res.send("Limited data.");
});

// This is the Error handling Middleware, which will be called if only any unhadled error occured.
app.use("/", (err, req, res, next) => {
  console.log("Some error is on our side.");
  res.status(500).send("Internal server Error");
});
