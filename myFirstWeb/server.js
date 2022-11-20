const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

//import extractFlowData function
const readFlowData = require("./extractFlowData.js");

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting public folder to become static
app.use("/public", express.static(path.join(__dirname, "public")));

//setting view engine to ejs
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

//route for index page
app.get("/", function (req, res) {
  res.render("index", {
    title: "Home",
  });
});

//route for flow page
app.get("/flow", function (req, res) {
  [nodeData, linkData] = readFlowData();
  res.render("flow", {
    title: "Flow",
    nodeData: nodeData,
    linkData: linkData,
  });
});

app.post("/flow", function (req, res) {
  [nodeData, linkData] = readFlowData(
    (applicationGroup = req.body.applicationGroup)
  );
  res.render("flow", {
    title: "Flow",
    nodeData: nodeData,
    linkData: linkData,
  });
});

//route for coming soon page
app.get("/soon", function (req, res) {
  res.render("soon", {
    title: "Coming Soon",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
