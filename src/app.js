const express = require("express");

const app = express();

app.listen(1111, () => {
  console.log("Server is Successfully listning to the PORT : 1111");
});

app.use("/test", (req, res) => {
  res.send("Namaskaram, on Test page.");
});

app.use((req, res) => {
  res.send("Namaskaram, How are you ?");
});

