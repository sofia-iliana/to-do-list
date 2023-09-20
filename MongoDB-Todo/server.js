const express = require("express");
const app = express();
app.use(express.json());
const router = require("./routers/TodoRouter.js");

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", router);

app.listen(2222, function () {
  console.log("Server is running on 2222");
});
