const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/todoRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const port = process.env.port || 3001;
//Database connection
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return;
    console.log("Connected to DB");

    app.listen(port, () => {
      console.log(`Server listening at localhost:${port}`);
    });
  }
);
