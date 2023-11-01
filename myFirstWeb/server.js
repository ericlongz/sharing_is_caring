const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require("passport-local-mongoose");
const User = require('./utils/login');
const port = 3000;
// const cors = require("cors");

mongoose.connect('mongodb://localhost/ericlie');

const { MongoClient } = require('mongodb');
//query statistics
const queryStatistic = require('./utils/queryStatistik');

//import Files
//import extractFlowData function
const readFlowData = require('./utils/extractFlowData.js');

//import queryFlowSearch function
const queryFlowSearch = require('./utils/queryFlowSearch.js');

//import queryDataOrderMonth function
const queryDataOrderMonth = require('./utils/queryDataOrderMonth.js');

//import validation function
const validation = require('./utils/validation.js');

//import validation function
//const getAgentData = require("./utils/agentData.js");

// allow CORS
// var allowedOrigins = [
//   "https://ctmweb.intra.bca.co.id:8443/automation-api/session/login",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting public folder to become static
app.use('/public', express.static(path.join(__dirname, 'public')));

//setting view engine to ejs
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(
  require('express-session')({
    secret: 'Rusty is a dog',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

//route for index page
// Showing home page
app.get('/', function (req, res) {
  res.render('login', {
    title: 'Login',
  });
});

// Showing secret page
app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret', { title: 'Secret' });
});

// Showing register form
app.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

// Handling user signup
app.post('/register', async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      password: password,
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.json(e);
  }
});

//Showing login form
app.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

//Handling user login
app.post('/login', async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.render('secret', { title: 'Secret' });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Handling user logout
app.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

//route for flow page
app.get('/flow', async function (req, res) {
  //res.send("Test");
  let nodeId = '""';
  [options, nodeData, linkData, applicationGroup] = await readFlowData();
  res.render('flow', {
    title: 'Flow',
    nodeData: nodeData,
    linkData: linkData,
    applicationGroup: applicationGroup,
    results: [],
    nodeId: nodeId,
  });
});

app.post('/flow/search', async function (req, res) {
  let nodeId = '""';
  results = await queryFlowSearch(req.body.JOB_NAME);
  if (typeof options !== 'undefined') {
    res.render('flow', {
      title: 'Flow',
      results: results,
      nodeId: nodeId,
    });
  } else {
    [options, nodeData, linkData, applicationGroup] = await readFlowData();
    res.render('flow', {
      title: 'Flow',
      nodeData: nodeData,
      linkData: linkData,
      applicationGroup: applicationGroup,
      results: results,
      nodeId: nodeId,
    });
  }
});

app.post('/flow/goTo', async function (req, res) {
  if (typeof options !== 'undefined') {
    if (applicationGroup !== req.body.groupName) {
      let nodeId = `"${req.body.nodeId}"`;
      [options, nodeData, linkData] = await readFlowData(
        (applicationGroup = req.body.groupName)
      );
      res.render('flow', {
        title: 'Flow',
        nodeData: nodeData,
        linkData: linkData,
        applicationGroup: applicationGroup,
        nodeId: nodeId,
      });
    } else {
      let nodeId = `"${req.body.nodeId}"`;
      res.render('flow', {
        title: 'Flow',
        nodeId: nodeId,
      });
    }
  } else {
    let nodeId = '""';
    [options, nodeData, linkData, applicationGroup] = await readFlowData();
    res.render('flow', {
      title: 'Flow',
      options: options,
      nodeData: nodeData,
      linkData: linkData,
      applicationGroup: applicationGroup,
      nodeId: nodeId,
      results: [],
    });
  }
});

app.post('/flow', async function (req, res) {
  let nodeId = '""';
  [options, nodeData, linkData] = await readFlowData(
    (applicationGroup = req.body.applicationGroup)
  );
  res.render('flow', {
    title: 'Flow',
    nodeData: nodeData,
    linkData: linkData,
    applicationGroup: applicationGroup,
    results: [],
    nodeId: nodeId,
  });
});

//route for validation page
app.get('/validation', async function (req, res) {
  //res.send("Test");
  let validationResult = 'start';
  res.render('validation', {
    title: 'Validation',
    validationResult: validationResult,
  });
});

app.post('/validation', async function (req, res) {
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
  res.render('validation', {
    title: 'Validation',
    validationResult: validationResult,
  });
});

//route for task page
app.get('/task', async function (req, res) {
  //res.send("Test");
  res.render('task', {
    title: 'Task',
  });
});

//route for statistic
app.get('/statistic', async function (request, response) {
  try {
    //optionsTahun = await readDataTahun();
    let optionsTahun = "<option value='2023'>2023</option>";
    response.render('form-statistic', {
      title: 'Form Statistic',
      optionsTahun: optionsTahun,
    });
  } catch (e) {
    console.log(`[ERROR] ${e}`);
  }
});

app.post('/statistic/getDataStatistic', async function (request, response) {
  try {
    let validationResult = validation(
      request.body.ctmLikeInJobName,
      request.body.ctmJobName,
      request.body.ctmLikeInGroupName,
      request.body.ctmGroupName,
      request.body.ctmLikeInServer,
      request.body.ctmServer,
      request.body.ctmLikeInUserId,
      request.body.ctmUserId,
      request.body.ctmLikeInTableName,
      request.body.ctmTableName
    );
    if (validationResult === true) {
      statistics = await queryStatistic.queryJobStatistic(
        MongoClient,
        request.body.ctmTahun,
        request.body.ctmBulan,
        request.body.ctmPlatform,
        request.body.ctmJobName,
        request.body.ctmServer,
        request.body.ctmGroupName,
        request.body.ctmUserId,
        request.body.ctmTableName,
        request.body.ctmEndedStatus,

        request.body.ctmLikeInJobName,
        request.body.ctmLikeInServer,
        request.body.ctmLikeInGroupName,
        request.body.ctmLikeInUserId,
        request.body.ctmLikeInTableName,

        request.body.ctmFromOdate,
        request.body.ctmFromOdateYYYY,
        request.body.ctmFromOdateMM,
        request.body.ctmFromOdateDD,

        request.body.ctmUntilOdate,
        request.body.ctmUntilOdateYYYY,
        request.body.ctmUntilOdateMM,
        request.body.ctmUntilOdateDD,

        request.body.ctmFromStartDate,
        request.body.ctmFromStartDateYYYY,
        request.body.ctmFromStartDateMM,
        request.body.ctmFromStartDateDD,

        request.body.ctmUntilStartDate,
        request.body.ctmUntilStartDateYYYY,
        request.body.ctmUntilStartDateMM,
        request.body.ctmUntilStartDateDD,

        request.body.ctmFromStartTime,
        request.body.ctmFromStartTimeHH,
        request.body.ctmFromStartTimeMM,
        request.body.ctmFromStartTimeSS,

        request.body.ctmUntilStartTime,
        request.body.ctmUntilStartTimeHH,
        request.body.ctmUntilStartTimeMM,
        request.body.ctmUntilStartTimeSS,

        request.body.ctmFromEndDate,
        request.body.ctmFromEndDateYYYY,
        request.body.ctmFromEndDateMM,
        request.body.ctmFromEndDateDD,

        request.body.ctmUntilEndDate,
        request.body.ctmUntilEndDateYYYY,
        request.body.ctmUntilEndDateMM,
        request.body.ctmUntilEndDateDD,

        request.body.ctmFromEndTime,
        request.body.ctmFromEndTimeHH,
        request.body.ctmFromEndTimeMM,
        request.body.ctmFromEndTimeSS,

        request.body.ctmUntilEndTime,
        request.body.ctmUntilEndTimeHH,
        request.body.ctmUntilEndTimeMM,
        request.body.ctmUntilEndTimeSS
      );
      // console.log(request.body);
      console.log(statistics);
    } else {
      statistics = [];
    }
    // console.log(request.body);
    // console.log(statistics);
  } catch (e) {
    console.log(e);
  }
});

//route for coming Log & Output page
app.get('/logOutput', function (req, res) {
  res.render('logOutput', {
    title: 'Log & Output',
  });
});

//halaman dashboard
app.get('/ordered', function (request, response) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var date = new Date();
  // minus a day
  date.setDate(date.getDate() - 1);
  let bulan = month[date.getMonth()];
  let tahun = date.getFullYear();
  try {
    response.render('ordered', {
      title: 'Ordered',
      bulan: bulan,
      tahun: tahun,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post('/ordered/getDataOrderMonth', function (request, response) {
  try {
    console.log(request.body);
    var label = request.body['tahun'] + '-' + request.body['bulan'];
    queryDataOrderMonth(label).then((results) => {
      let labelsArr = [];
      let devDataArr = [];
      let prodDataArr = [];
      let totalDataArr = [];
      for (let i = 0; i < results.length; i++) {
        labelsArr.push(results[i]['NET_DATE']);
        devDataArr.push(results[i]['SUM DEV']);
        prodDataArr.push(results[i]['SUM PROD']);
        totalDataArr.push(results[i]['TOTAL']);
      }
      response
        .status(200)
        .send([labelsArr, devDataArr, prodDataArr, totalDataArr]);
    });
  } catch (e) {
    console.log(e);
  }
});

//route for agent page
app.get('/agent', async function (req, res) {
  //res.send("Test");
  res.render('agent', {
    title: 'Agent',
  });
});

//route for coming soon page
app.get('/soon', function (req, res) {
  res.render('soon', {
    title: 'Coming Soon',
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
