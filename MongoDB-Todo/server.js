const express = require("express");
const app = express();
app.use(express.json());
const router = require("./routers/TodoRouter.js");

const cors = require("cors");
app.use(
  cors({
    origin: "https://to-do-list-8b6d.onrender.com",
  })
);

app.use("/", router);

app.listen(2222, function () {
  console.log("Server is running on 2222");
});
