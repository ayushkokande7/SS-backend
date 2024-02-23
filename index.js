const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const Present_interns = require("./Routes/Present_interns");
const Auth = require("./Routes/Auth");
const Leaders = require("./Routes/Leaders");
const Past_interns = require("./Routes/Past_interns");
const Terminated_interns = require("./Routes/Terminated_interns");
const Quiz = require("./Routes/Quiz");
const App = require("./src/routes");
const cors = require("cors");
const Middleware = require("./Routes/Middleware");
app.use(bodyParser.json());
app.use(
  cors(),
  //   {
  //   origin: "https://rzx75l-3000.csb.app",
  //   credentials: true,
  //   //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   // allowedHeaders: ['Content-Type', 'Authorization'],
  // }
);
app.use("/auth", Auth);
app.use("/leaders", Middleware, Leaders);
app.use("/interns", Middleware, Present_interns);
app.use("/pinterns", Middleware, Past_interns);
app.use("/tinterns", Middleware, Terminated_interns);
app.use("/quiz", Quiz);
app.use("/api", App);

app.get("/", (req, res) => {
  res.json("API working");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
