const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
// const { username, password } = require("./mongouri.json")

//routes imports
const users = require("./routes/users");
const auth = require("./routes/auth");
const boards = require("./routes/boards");
const lists = require("./routes/lists");
const tasks = require("./routes/tasks");
//Connect to mongodb
// mongoose
//   .connect(
//     `mongodb+srv://${username}:${password}@cluster0.rza4y.mongodb.net/tasko?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(`Could not connect mongodb: ${err} `));

mongoose
  .connect("mongodb://localhost/tasko", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());

//routes
app.use("/tasko/users", users);
app.use("/tasko/auth", auth);
app.use("/tasko/boards", boards);
app.use("/tasko/lists", lists);
app.use("/tasko/cards", tasks);

//port and listening
const port = 8181;
http.listen(port, () => console.log(`Listening to port ${port}`));
