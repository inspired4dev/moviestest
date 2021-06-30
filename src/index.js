//IMPORT MODULES
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

//IMPORT ROUTES
const MOVIES_ROUTES = require("./routes/movies.routes");
const CLASSIFICATION_ROUTES = require("./routes/classification.routes");

//IMPORT CONNECTION TO DATABASE
const connectDatabase = require("./database");

//SETTINGS SERVER
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

//MIDDLEWARES SERVER
app.use(morgan("dev"));
app.use(express.json());

//CONNECTION DATABASE WITH VALIDATION
connectDatabase()
  .then(() => {
    //ROUTES
    app.use("/api/movies", MOVIES_ROUTES);
    app.use("/api/classification", CLASSIFICATION_ROUTES);

    //STATIC FILES
    app.use(express.static(path.join(__dirname, "public")));

    //STARTING SERVER
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch((e) => {
    //STATIC FILES ERROR
    app.use(express.static(path.join(__dirname, "error")));

    //STARTING SERVER WITH ERROR
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  });
