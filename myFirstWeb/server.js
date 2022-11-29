const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

//import extractFlowData function
const readFlowData = require("./extractFlowData.js");

//import queryFlowSearch function
const queryFlowSearch = require("./queryFlowSearch.js");

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
app.get("/flow", async function (req, res) {
  //res.send("Test");
  [options, nodeData, linkData, applicationGroup] = await readFlowData();
  res.render("flow", {
    title: "Flow",
    nodeData: nodeData,
    linkData: linkData,
    applicationGroup: applicationGroup,
    results: [],
  });
});

app.post("/flow", async function (req, res) {
  if (req.body.JOB_NAME !== undefined) {
    results = await queryFlowSearch(req.body.JOB_NAME);
    if (typeof options !== "undefined") {
      res.render("flow", {
        title: "Flow",
        results: results,
      });
    } else {
      [options, nodeData, linkData, applicationGroup] = await readFlowData();
      res.render("flow", {
        title: "Flow",
        nodeData: nodeData,
        linkData: linkData,
        applicationGroup: applicationGroup,
      });
    }
  } else {
    [options, nodeData, linkData] = await readFlowData(
      (applicationGroup = req.body.applicationGroup)
    );
    res.render("flow", {
      title: "Flow",
      nodeData: nodeData,
      linkData: linkData,
      applicationGroup: applicationGroup,
    });
  }
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
