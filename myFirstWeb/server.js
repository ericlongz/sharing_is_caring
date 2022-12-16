const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

//import Files
//import extractFlowData function
const readFlowData = require("./utils/extractFlowData.js");

//import queryFlowSearch function
const queryFlowSearch = require("./utils/queryFlowSearch.js");

//import validation function
const validation = require("./utils/validation.js");

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
  let nodeId = '""';
  [options, nodeData, linkData, applicationGroup] = await readFlowData();
  res.render("flow", {
    title: "Flow",
    nodeData: nodeData,
    linkData: linkData,
    applicationGroup: applicationGroup,
    results: [],
    nodeId: nodeId,
  });
});

app.post("/flow/search", async function (req, res) {
  let nodeId = '""';
  results = await queryFlowSearch(req.body.JOB_NAME);
  if (typeof options !== "undefined") {
    res.render("flow", {
      title: "Flow",
      results: results,
      nodeId: nodeId,
    });
  } else {
    [options, nodeData, linkData, applicationGroup] = await readFlowData();
    res.render("flow", {
      title: "Flow",
      nodeData: nodeData,
      linkData: linkData,
      applicationGroup: applicationGroup,
      results: results,
      nodeId: nodeId,
    });
  }
});

app.post("/flow/goTo", async function (req, res) {
  if (typeof options !== "undefined") {
    if (applicationGroup !== req.body.groupName) {
      let nodeId = `"${req.body.nodeId}"`;
      [options, nodeData, linkData] = await readFlowData(
        (applicationGroup = req.body.groupName)
      );
      res.render("flow", {
        title: "Flow",
        nodeData: nodeData,
        linkData: linkData,
        applicationGroup: applicationGroup,
        nodeId: nodeId,
      });
    } else {
      let nodeId = `"${req.body.nodeId}"`;
      res.render("flow", {
        title: "Flow",
        nodeId: nodeId,
      });
    }
  } else {
    let nodeId = '""';
    [options, nodeData, linkData, applicationGroup] = await readFlowData();
    res.render("flow", {
      title: "Flow",
      options: options,
      nodeData: nodeData,
      linkData: linkData,
      applicationGroup: applicationGroup,
      nodeId: nodeId,
      results: [],
    });
  }
});

app.post("/flow", async function (req, res) {
  let nodeId = '""';
  [options, nodeData, linkData] = await readFlowData(
    (applicationGroup = req.body.applicationGroup)
  );
  res.render("flow", {
    title: "Flow",
    nodeData: nodeData,
    linkData: linkData,
    applicationGroup: applicationGroup,
    results: [],
    nodeId: nodeId,
  });
});

//route for validation page
app.get("/validation", async function (req, res) {
  //res.send("Test");
  let validationResult = "start";
  res.render("validation", {
    title: "Validation",
    validationResult: validationResult,
  });
});

app.post("/validation", async function (req, res) {
  //res.send("Test");
  let validationResult = validation(
    req.body.ctmLikeInJobname,
    req.body.ctmJobName,
    req.body.ctmLikeInGroupName,
    req.body.ctmGroupName,
    req.body.ctmLikeInApplication,
    req.body.ctmApplication,
    req.body.ctmLikeInServer,
    req.body.ctmServer,
    req.body.ctmLikeInUserId,
    req.body.ctmUserId
  );
  res.render("validation", {
    title: "Validation",
    validationResult: validationResult,
  });
});

//route for task page
app.get("/task", async function (req, res) {
  //res.send("Test");
  res.render("task", {
    title: "Task",
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
