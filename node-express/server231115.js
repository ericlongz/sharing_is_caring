const fs = require('fs');

const https = require('https');
const path = require("path");
const bodyParser = require("body-parser");
var privateKey  = fs.readFileSync('sslcert/autowebdev.key', 'utf8');
var certificate = fs.readFileSync('sslcert/autowebdev.cer', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const { response, Router, request } = require('express');
const express = require('express')
const app = express() 
const port = 443

var httpsServer = https.createServer(credentials, app);

//function query
const {MongoClient} =  require('mongodb');
const queryInformation = require('./utils/query') ;
const queryStatistic =  require('./utils/queryStatistik');

//import extractDataTahun function
const readDataTahun = require("./extractDataTahun.js");

//import extractFlowData function
const readFlowData = require("./extractFlowData.js");

//import queryFlowSearch function
const queryFlowSearch = require("./queryFlowSearch.js");

//import validation function
const validation = require("./validation.js");

app.use(express.static(path.join(__dirname, "public")));

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//import logger function
const logger = require("./logger/logger");

//halaman home
app.get('/', async function(request,response){
	try{
		const jumlahJobOS = await queryInformation.queryJumlahJob(
        MongoClient, 
        ctmPlatform = 'OPEN SYSTEM');

    var HomejumlahJobOS = jumlahJobOS.length;
	//var HomejumlahJobOS = 18954

    const jumlahJobMF = await queryInformation.queryJumlahJob(
        MongoClient, 
        ctmPlatform = 'MAINFRAME');
    
    var HomejumlahJobMF = jumlahJobMF.length;
	//var HomejumlahJobMF = 9867

    const jumlahAgent = await queryInformation.queryJumlahAgent(
        MongoClient, 
        ctmAgentStatus = 'Available');
    
    var HomejumlahAgent = jumlahAgent.length;
	//var HomejumlahAgent = 1564

    response.render('home',{
        title: 'Home',
        HomejumlahJobOS, HomejumlahJobMF,
        HomejumlahAgent
    });		
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	}
});

//route for flow page
app.get("/flow", async function (req, res) {
  try{
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
  } catch (e){
	logger.error(`[ERROR] ${e}`)
  }
});

app.post("/flow/search", async function (req, res) {
  try{
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
  } catch(e){
	logger.error(`[ERROR] ${e}`)
  }
});

app.post("/flow/goTo", async function (req, res) {
	try{
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
  }} catch(e){
	logger.error(`[ERROR] ${e}`)
  }
});

app.post("/flow", async function (req, res) {
	try{
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
  });} catch(e){
	logger.error(`[ERROR] ${e}`)
  }
});

//halaman faqs
app.get('/faqs',function(request,response){
	try{
		response.render('FAQS',{title : 'FAQS'});
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	}
});

//halaman submit form information
app.get('/information', function(request,response){
	try{
		response.render('form-information',{
        title: 'Form Information'});
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	} 
});
 
//proses data form information
app.post('/information', async function(request,response) {
	try{
		let validationResult = validation(
    request.body.ctmLikeInJobName,
    request.body.ctmJobName,
    request.body.ctmLikeInGroupName,
    request.body.ctmGroupName,
    request.body.ctmLikeInApplication,
    request.body.ctmApplication,
    request.body.ctmLikeInServer,
    request.body.ctmServer,
    request.body.ctmLikeInUserId,
    request.body.ctmUserId
  );	
	if (validationResult === true){
		informations = await queryInformation.queryJobTerdaftar(
        MongoClient,
        request.body.ctmPlatform,
        request.body.ctmJobName,
        request.body.ctmServer, 
        request.body.ctmGroupName, 
        request.body.ctmApplication, 
        request.body.ctmUserId,
        request.body.ctmLikeInJobName,
        request.body.ctmLikeInServer,
        request.body.ctmLikeInGroupName,
        request.body.ctmLikeInApplication,
        request.body.ctmLikeInUserId
    );} else {
		informations = [];
	}
	
    response.render('information',{
        title: 'Information',
        informations,
		validationResult});
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	}
}); 

//schedule   
app.get('/information/:JOB_NAME/:JOB_ID/:TABLE_ID', async function(request,response) {
	try{
		const scheduleInformation = await queryInformation.querySchedule(
        MongoClient,
        request.params.JOB_ID,
        request.params.TABLE_ID
    );

    response.render('schedule',{
        title: 'Schedule',
        scheduleInformation});
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	}
    }); 

//halaman submit form statistic
app.get('/statistic', async function(request,response){
	try{
		optionsTahun = await readDataTahun();
		response.render('form-statistic',{
		title: 'Form Statistic',
		validationResult: true,
		optionsTahun: optionsTahun,});
	}catch(e){
		logger.error(`[ERROR] ${e}`)
	}
});

//proses data form Statistic
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
		console.log(validationResult);
		// console.log(request.body);
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
		} else {
			statistics = [];
		}
		response.status(200).send(statistics);
	} catch(e){
		logger.error(`[ERROR] $(e)`)
	}
});

//proses data form Statistic (old)
// app.post('/statistic', async function(request,response) {
	// try{
		// optionsTahun = await readDataTahun();
	// let validationResult = validation(
    // request.body.ctmLikeInJobName,
    // request.body.ctmJobName,
    // request.body.ctmLikeInGroupName,
    // request.body.ctmGroupName,
    // request.body.ctmLikeInServer,
    // request.body.ctmServer,
    // request.body.ctmLikeInUserId,
    // request.body.ctmUserId,
	// request.body.ctmLikeInTableName,
    // request.body.ctmTableName
  // );
	// if (validationResult === true){
    // statistics = await queryStatistic.queryJobStatistic(
        // MongoClient,
		// request.body.ctmTahun,
		// request.body.ctmBulan,
        // request.body.ctmPlatform,
        // request.body.ctmJobName,
        // request.body.ctmServer,
        // request.body.ctmGroupName,
        // request.body.ctmUserId,
        // request.body.ctmTableName,
        // request.body.ctmEndedStatus,

        // request.body.ctmLikeInJobName,
        // request.body.ctmLikeInServer,
        // request.body.ctmLikeInGroupName,
        // request.body.ctmLikeInUserId,
        // request.body.ctmLikeInTableName,

        // request.body.ctmFromOdate,
        // request.body.ctmFromOdateYYYY,
        // request.body.ctmFromOdateMM,
        // request.body.ctmFromOdateDD,

        // request.body.ctmUntilOdate,
        // request.body.ctmUntilOdateYYYY,
        // request.body.ctmUntilOdateMM,
        // request.body.ctmUntilOdateDD,

        // request.body.ctmFromStartDate,
        // request.body.ctmFromStartDateYYYY,
        // request.body.ctmFromStartDateMM,
        // request.body.ctmFromStartDateDD,
        
        // request.body.ctmUntilStartDate,
        // request.body.ctmUntilStartDateYYYY,
        // request.body.ctmUntilStartDateMM,
        // request.body.ctmUntilStartDateDD,
        
        // request.body.ctmFromStartTime,
        // request.body.ctmFromStartTimeHH,
        // request.body.ctmFromStartTimeMM,
        // request.body.ctmFromStartTimeSS,    
        
        // request.body.ctmUntilStartTime,
        // request.body.ctmUntilStartTimeHH,
        // request.body.ctmUntilStartTimeMM,
        // request.body.ctmUntilStartTimeSS,

        // request.body.ctmFromEndDate,
        // request.body.ctmFromEndDateYYYY,
        // request.body.ctmFromEndDateMM,
        // request.body.ctmFromEndDateDD,

        // request.body.ctmUntilEndDate,
        // request.body.ctmUntilEndDateYYYY,
        // request.body.ctmUntilEndDateMM,
        // request.body.ctmUntilEndDateDD,

        // request.body.ctmFromEndTime,
        // request.body.ctmFromEndTimeHH,
        // request.body.ctmFromEndTimeMM,
        // request.body.ctmFromEndTimeSS,

        // request.body.ctmUntilEndTime,
        // request.body.ctmUntilEndTimeHH,
        // request.body.ctmUntilEndTimeMM,
        // request.body.ctmUntilEndTimeSS        
    // );} else {
		// statistics = [];
	// }

    // await response.render('statistic',{
        // title: 'Statistic',
        // statistics,
		// validationResult, 
		// optionsTahun: optionsTahun,});		
	// }catch(e){
		// logger.error(`[ERROR] $(e)`)
	// }
// });

// testing hit API JAMS
app.get('/testJams', function (request, response) {
  try {
    console.log('test hit API JAMS')
      response
        .status(200)
        .send({'code':200, 'informasi':'berhasil'});
  } catch (e) {
    console.log(e);
  }
});

httpsServer.listen(443);