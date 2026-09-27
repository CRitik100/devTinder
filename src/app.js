const express = require("express");

const app = express();

app.listen(1111, () => {
  console.log("Server is Successfully listning to the PORT : 1111");
});

app.get("/user/:userId/img{.:ext}/*imgPath", (req, res) => {
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

/**
 * 1. URL: http://localhost:1111/user/123/img/Shankar Nagar?city=mumbai
 * output:
 * {
    "firstName": "Vickey",
    "lastName": "Chavan",
    "userId": "123",
    "imgPath": [
        "Shankar Nagar"
    ],
    "queryParameter": {
        "city": "mumbai"
    }
}
 * 2. URL: http://localhost:1111/user/123/img.png/Shankar Nagar?city=mumbai
 * output:
 * {
    "firstName": "Vickey",
    "lastName": "Chavan",
    "userId": "123",
    "optionalSegments": "png",
    "imgPath": [
        "Shankar Nagar"
    ],
    "queryParameter": {
        "city": "mumbai"
    }
} 
 */

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
