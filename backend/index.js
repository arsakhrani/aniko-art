require("dotenv").config();
const mongoDomain = process.env.ROOT_MONGO_DOMAIN;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cronJobs = require("./utils/cronJobs");

const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(`${mongoDomain}/aniko-art`, {
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
app.use("/api", apiRouter);
apiRouter.use("/user", routes.userRoutes);
apiRouter.use("/artwork", routes.artworkRoutes);
apiRouter.use("/artist", routes.artistRoutes);
apiRouter.use("/gallery", routes.galleryRoutes);
apiRouter.use("/checkout", routes.stripeRoutes);

cron.schedule("0 * * * *", async () => {
  console.log("running a task every hour");
  //await cronJobs.expireActiveBids()
  //await cronJobs.processPurchases()
});

app.listen(port, () => {
  console.log(`Aniko-art backend listening at ${port}`);
});
