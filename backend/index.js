const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/aniko-art", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connection open");
  })
  .catch((err) => {
    console.log(err);
  });

const apiRouter = express.Router();
// app.use("/api", apiRouter);
// apiRouter.use("/user", routes.userRoutes);

app.listen(port, () => {
  console.log(`Aniko-art backend listening at ${port}`);
});
