const express = require("express");
const userRouter = require("./api/routers/user.routers");
const connectDB = require("./Database/");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//to make the Backend accessible from different domains
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
// console.log("This is the path:", path.join(__dirname, "media"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);
  next();
});

//Route
// app.use("/api/products", productRouter);
// app.use("/media", express.static(path.join(__dirname, "media")));
// app.use("/api/shops", shopRouter);
app.use("/api/user", userRouter);
// app.use("/api/order", orderRouter);

//Path not found middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path not found" });
});

//Error handeling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
  connectDB();
});
