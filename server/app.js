const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const { username, password } = require("./mongouri.json")
//routes imports
const users = require("./routes/users");
const groups = require("./routes/groups");
const auth = require("./routes/auth");

//Connect to mongodb
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.rza4y.mongodb.net/tasko?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Could not connect mongodb: ${err} `));

app.use(cors());
app.use(express.json());

//routes
app.use("/tasko/users", users);
app.use("/tasko/groups", groups);
app.use("/tasko/auth", auth);

//port and listening
const port = 8181;
http.listen(port, () => console.log(`Listening to port ${port}`));
