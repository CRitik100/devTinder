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

/**
 * 1. URL: http://localhost:1111/admin/user/123/img/Shankar Nagar?city=mumbai
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
 * 2. URL: http://localhost:1111/admin/user/123/img.png/Shankar Nagar?city=mumbai
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
  res.send("Limited data.");
});
