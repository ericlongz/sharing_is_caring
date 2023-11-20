const fs = require('fs');

const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
// var privateKey = fs.readFileSync('sslcert/autowebdev.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/autowebdev.cer', 'utf8');

// const credentials = { key: privateKey, cert: certificate };
const { response, Router, request } = require('express');
const express = require('express');
const app = express();
const port = 3000;

// var httpsServer = https.createServer(credentials, app);

//function query
const { MongoClient } = require('mongodb');
const queryInformation = require('./utils/query');
const queryLogJob = require('./utils/queryLogJob');
const queryStatistic = require('./utils/queryStatistik');

//import extractDataTahun function
const readDataTahun = require('./extractDataTahun.js');

//import extractDataTahunDashboard function
const readDataTahunDashboard = require('./utils/extractDataTahunDashboard.js');

//import extractFlowData function
const readFlowData = require('./extractFlowData.js');

//import queryFlowSearch function
const queryFlowSearch = require('./queryFlowSearch.js');

//import validation function
const validation = require('./validation.js');

//import logger function
const logger = require('./logger/logger');

//import extractChartOrderHarian function
const readOrderHarian = require('./utils/extractChartTerorderHarian.js');

//import extractChartDaftarHarian function
const readDaftarHarian = require('./utils/exractChartTerdaftarHarian.js');

//import extractChartEndedStatus function
const readEndedStatus = require('./utils/extractChartOkNotOkNotRun.js');

//import extractChartTop10NotOk function
const readTop10NotOK = require('./utils/extractChartTop10NotOk.js');

//import queryDataOrderMonth function
const queryDataOrderMonth = require('./utils/queryDataOrderMonth.js');

//import queryDataNotOkMonth function
const queryDataNotOkMonth = require('./utils/queryDataNotOkMonth.js');

//import queryDataTerdaftarMonth function
const queryDataTerdaftarMonth = require('./utils/queryDataTerdaftarMonth.js');
const { Console } = require('console');

app.use(express.static(path.join(__dirname, 'public')));

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//halaman home
app.get('/', async function (request, response) {
  try {
    const jumlahJobOS = await queryInformation.queryJumlahJob(
      MongoClient,
      (ctmPlatform = 'OPEN SYSTEM')
    );

    var HomejumlahJobOS = jumlahJobOS.length;
    //var HomejumlahJobOS = 18954

    const jumlahJobMF = await queryInformation.queryJumlahJob(
      MongoClient,
      (ctmPlatform = 'MAINFRAME')
    );

    var HomejumlahJobMF = jumlahJobMF.length;
    //var HomejumlahJobMF = 9867

    const jumlahAgent = await queryInformation.queryJumlahAgent(
      MongoClient,
      (ctmAgentStatus = 'Available')
    );

    var HomejumlahAgent = jumlahAgent.length;
    //var HomejumlahAgent = 1564

    response.render('home', {
      title: 'Home',
      HomejumlahJobOS,
      HomejumlahJobMF,
      HomejumlahAgent,
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

//route for flow page
app.get('/flow', async function (req, res) {
  try {
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
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.post('/flow/search', async function (req, res) {
  try {
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
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.post('/flow/goTo', async function (req, res) {
  try {
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
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.post('/flow', async function (req, res) {
  try {
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
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});
//halaman faqs
app.get('/faqs', function (request, response) {
  try {
    response.render('FAQS', { title: 'FAQS' });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

//halaman dashboard
app.get('/dashboard', async function (request, response) {
  try {
    [
      orderHarianDev,
      totalOrderHarianDev,
      orderHarianProd,
      totalOrderHarianProd,
      last_Sync,
    ] = await readOrderHarian();

    [
      daftarHarianMf,
      totaldaftarHarianMf,
      daftarAplikasiMf,
      daftarHarianOs,
      totaldaftarHarianOs,
      daftarAplikasiOs,
      last_Sync_terdaftar,
    ] = await readDaftarHarian();

    [
      endedStatusOk,
      endedStatusNotOk,
      endedStatusNotRun,
      endedStatusOkWeek,
      endedStatusNotOkWeek,
      endedStatusNotRunWeek,
    ] = await readEndedStatus();

    response.render('dashboard', {
      title: 'Dashboard Monitoring',
      orderHarianDev: orderHarianDev,
      totalOrderHarianDev: totalOrderHarianDev,
      orderHarianProd: orderHarianProd,
      totalOrderHarianProd: totalOrderHarianProd,
      last_Sync: last_Sync,
      daftarHarianMf: daftarHarianMf,
      totaldaftarHarianMf: totaldaftarHarianMf,
      daftarAplikasiMf: daftarAplikasiMf,
      daftarHarianOs: daftarHarianOs,
      totaldaftarHarianOs: totaldaftarHarianOs,
      daftarAplikasiOs: daftarAplikasiOs,
      last_Sync_terdaftar: last_Sync_terdaftar,
      endedStatusOk: endedStatusOk,
      endedStatusNotOk: endedStatusNotOk,
      endedStatusNotRun: endedStatusNotRun,
      endedStatusOkWeek: endedStatusOkWeek,
      endedStatusNotOkWeek: endedStatusNotOkWeek,
      endedStatusNotRunWeek: endedStatusNotRunWeek,
    });
    // console.log(daftarAplikasiMf);
    // console.log(daftarHarianMf);
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.get('/DashboardHistory', async function (request, response) {
  try {
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

    let environment = 'BCAPROD';

    var date = new Date();
    // minus a day
    date.setDate(date.getDate() - 1);
    let bulan = month[date.getMonth()];
    let tahun = date.getFullYear();
    let bulanorder = month[date.getMonth()];
    let tahunorder = date.getFullYear();

    optionsTahunDashboard = await readDataTahunDashboard();

    response.render('DashboardHistory', {
      title: 'Dashboard History',
      bulan: bulan,
      tahun: tahun,
      environment: environment,
      bulanorder: bulanorder,
      tahunorder: tahunorder,
      optionsTahunDashboard: optionsTahunDashboard,
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.post(
  '/dashboard/getDataTerdaftarMonth',
  async function (request, response) {
    try {
      var label = request.body['tahun'] + '-' + request.body['bulan'];
      let environment = request.body['environment'];

      const labelmf = [
        'DATE',
        'ATM',
        'AUTO',
        'CARD',
        'EBS',
        'GL',
        'IDS',
        'ILS',
        'ITS',
        'OTHER',
      ];

      const labelos = [
        'DATE',
        'Automation',
        'BCA Digital',
        'BDS',
        'BOSystem',
        'Backup',
        'CRM & BBP',
        'Card Op Sys',
        'DBAdmin',
        'DWH & BigData',
        'EAI',
        'ECM',
        'FIRE SWIFT CITYNET',
        'FRR',
        'ILS Op Sys',
        'KBB',
        'KBI',
        'KONDOR',
        'MBANK',
        'Middleware',
        'OTHERS',
        'SAP',
        'TANDEM & FLAZZ',
      ];

      optionsTahunDashboard = await readDataTahunDashboard();

      queryDataTerdaftarMonth(label, environment).then((results) => {
        let labelsArr = [];
        let atmDataArr = [];
        let autoDataArr = [];
        let cardDataArr = [];
        let ebsDataArr = [];
        let glDataArr = [];
        let idsDataArr = [];
        let ilsDataArr = [];
        let itsDataArr = [];
        let otherDataArr = [];
        let Automation = [];
        let BCADigital = [];
        let BDS = [];
        let BOSystem = [];
        let Backup = [];
        let CRMBBP = [];
        let CardOpSys = [];
        let DBAdmin = [];
        let DWHBigData = [];
        let EAI = [];
        let ECM = [];
        let FireSwiftCitynet = [];
        let FRR = [];
        let ILSOpSys = [];
        let KBB = [];
        let KBI = [];
        let KONDOR = [];
        let MBANK = [];
        let Middleware = [];
        let OTHERS = [];
        let SAP = [];
        let SystemAdmin = [];
        let TANDEMFLAZZ = [];

        if (environment === 'BCAPROD') {
          for (let i = 0; i < results.length; i++) {
            labelsArr.push(results[i][labelmf[0]]);
            atmDataArr.push(results[i][labelmf[1]]);
            autoDataArr.push(results[i][labelmf[2]]);
            cardDataArr.push(results[i][labelmf[3]]);
            ebsDataArr.push(results[i][labelmf[4]]);
            glDataArr.push(results[i][labelmf[5]]);
            idsDataArr.push(results[i][labelmf[6]]);
            ilsDataArr.push(results[i][labelmf[7]]);
            itsDataArr.push(results[i][labelmf[8]]);
            otherDataArr.push(results[i][labelmf[9]]);
          }
          response
            .status(200)
            .send([
              labelsArr,
              atmDataArr,
              autoDataArr,
              cardDataArr,
              ebsDataArr,
              glDataArr,
              idsDataArr,
              ilsDataArr,
              itsDataArr,
              otherDataArr,
            ]);
        } else {
          for (let i = 0; i < results.length; i++) {
            Automation.push(results[i][labelos[0]]);
            BCADigital.push(results[i][labelos[1]]);
            BDS.push(results[i][labelos[2]]);
            BOSystem.push(results[i][labelos[3]]);
            Backup.push(results[i][labelos[4]]);
            CRMBBP.push(results[i][labelos[5]]);
            CardOpSys.push(results[i][labelos[6]]);
            DBAdmin.push(results[i][labelos[7]]);
            DWHBigData.push(results[i][labelos[8]]);
            EAI.push(results[i][labelos[9]]);
            ECM.push(results[i][labelos[10]]);
            FireSwiftCitynet.push(results[i][labelos[11]]);
            FRR.push(results[i][labelos[12]]);
            ILSOpSys.push(results[i][labelos[13]]);
            KBB.push(results[i][labelos[14]]);
            KBI.push(results[i][labelos[15]]);
            KONDOR.push(results[i][labelos[16]]);
            MBANK.push(results[i][labelos[17]]);
            Middleware.push(results[i][labelos[18]]);
            OTHERS.push(results[i][labelos[19]]);
            SAP.push(results[i][labelos[20]]);
            SystemAdmin.push(results[i][labelos[21]]);
            TANDEMFLAZZ.push(results[i][labelos[22]]);
          }
          response
            .status(200)
            .send([
              Automation,
              BCADigital,
              BDS,
              BOSystem,
              Backup,
              CRMBBP,
              CardOpSys,
              DBAdmin,
              DWHBigData,
              EAI,
              ECM,
              FireSwiftCitynet,
              FRR,
              ILSOpSys,
              KBB,
              KBI,
              KONDOR,
              MBANK,
              Middleware,
              OTHERS,
              SAP,
              SystemAdmin,
              TANDEMFLAZZ,
              optionsTahunDashboard,
            ]);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  '/DashboardHistory/getDataOrderMonth',
  async function (request, response) {
    try {
      var label = request.body['tahunorder'] + '-' + request.body['bulanorder'];

      optionsTahunDashboard = await readDataTahunDashboard();
      // console.log();
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
          .send([
            labelsArr,
            devDataArr,
            prodDataArr,
            totalDataArr,
            optionsTahunDashboard,
          ]);

        // console.log(totalDataArr);
      });
    } catch (e) {
      console.log(e);
    }
  }
);

app.get('/DashboardNotOk', async function (request, response) {
  try {
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

    let environment = 'MAINFRAME';

    var date = new Date();
    // minus a day
    date.setDate(date.getDate() - 1);

    let tanggal = date.getDate();
    let bulan = month[date.getMonth()];
    let tahun = date.getFullYear();

    optionsTahunDashboard = await readDataTahunDashboard();

    [job_name_top_10_os, total_top_10_os] =
      await readTop10NotOK.queryTop10NotOkOS();

    [job_name_top_10_mf, total_top_10_mf] =
      await readTop10NotOK.queryTop10NotOkMF();

    response.render('DashboardNotOk', {
      title: 'Dashboard Ended Not OK',
      tanggal: tanggal,
      bulan: bulan,
      tahun: tahun,
      environment: environment,
      optionsTahunDashboard: optionsTahunDashboard,
      job_name_top_10_os: job_name_top_10_os,
      total_top_10_os: total_top_10_os,
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

app.post(
  '/DashboardNotOk/getDataNotOkMonthDetail',
  async function (request, response) {
    try {
      var label =
        request.body['tahun'] +
        '-' +
        request.body['bulan'] +
        '-' +
        request.body['tanggal'];

      let environment = request.body['environment'];

      queryDataNotOkMonth
        .queryJobNotOkTable(label, environment)
        .then((resultsTable) => {
          let dataCenterArr = [];
          let jobNameArr = [];
          let orderDateArr = [];
          let nodeIdArr = [];
          let ownerArr = [];
          let startDateArr = [];
          let startTimeArr = [];
          let endDateArr = [];
          let endTimeArr = [];
          let endedStatusArr = [];

          for (let i = 0; i < resultsTable.length; i++) {
            dataCenterArr.push(resultsTable[i]['DATA_CENTER']);
            jobNameArr.push(resultsTable[i]['JOB_NAME']);
            orderDateArr.push(resultsTable[i]['ORDER_DATE']);
            nodeIdArr.push(resultsTable[i]['NODE_ID']);
            ownerArr.push(resultsTable[i]['OWNER']);
            startDateArr.push(resultsTable[i]['START_DATE']);
            startTimeArr.push(resultsTable[i]['START_TIME']);
            endDateArr.push(resultsTable[i]['END_DATE']);
            endTimeArr.push(resultsTable[i]['END_TIME']);
            endedStatusArr.push(resultsTable[i]['ENDED_STATUS']);
          }

          // console.log(dataCenterArr);
          response
            .status(200)
            .send([
              dataCenterArr,
              jobNameArr,
              orderDateArr,
              nodeIdArr,
              ownerArr,
              startDateArr,
              startTimeArr,
              endDateArr,
              endTimeArr,
              endedStatusArr,
            ]);
        });
    } catch (e) {
      logger.error(`[ERROR] ${e}`);
    }
  }
);

app.post(
  '/DashboardNotOk/getDataNotOkMonth',
  async function (request, response) {
    try {
      var label =
        request.body['tahun'] +
        '-' +
        request.body['bulan'] +
        '-' +
        request.body['tanggal'];

      let environment = request.body['environment'];

      optionsTahunDashboard = await readDataTahunDashboard();

      // console.log(label);
      // console.log(environment);

      queryDataNotOkMonth.queryNotOk(label, environment).then((results) => {
        let labelsArr = [];
        let totalNotOkArr = [];

        for (let i = 0; i < results.length; i++) {
          labelsArr.push(results[i]['TIME_IDX']);
          totalNotOkArr.push(results[i]['TOTAL']);
        }

        // console.log(labelsArr);
        response
          .status(200)
          .send([labelsArr, totalNotOkArr, optionsTahunDashboard]);
      });
    } catch (e) {
      console.log(e);
    }
  }
);

//halaman submit form information
app.get('/information', function (request, response) {
  try {
    response.render('form-information', {
      title: 'Form Information',
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

//proses data form information
app.post('/information', async function (request, response) {
  try {
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
    if (validationResult === true) {
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
      );
    } else {
      informations = [];
    }

    response.render('information', {
      title: 'Information',
      informations,
      validationResult,
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
  }
});

//schedule
app.get(
  '/information/:JOB_NAME/:JOB_ID/:TABLE_ID',
  async function (request, response) {
    try {
      const scheduleInformation = await queryInformation.querySchedule(
        MongoClient,
        request.params.JOB_ID,
        request.params.TABLE_ID
      );

      response.render('schedule', {
        title: 'Schedule',
        scheduleInformation,
      });
    } catch (e) {
      logger.error(`[ERROR] ${e}`);
    }
  }
);

//halaman submit form statistic
app.get('/statistic', async function (request, response) {
  try {
    optionsTahun = await readDataTahun();
    response.render('form-statistic', {
      title: 'Form Statistic',
      validationResult: true,
      optionsTahun: optionsTahun,
    });
  } catch (e) {
    logger.error(`[ERROR] ${e}`);
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
  } catch (e) {
    logger.error(`[ERROR] $(e)`);
  }
});

// testing hit API JAMS
app.get('/testJams', function (request, response) {
  try {
    console.log('test hit API JAMS');
    response.status(200).send({ code: 200, informasi: 'berhasil' });
  } catch (e) {
    console.log(e);
  }
});

// testing hit API JAMS
app.get('/logJob', async function (request, response) {
  try {
    const encoder = new TextEncoder();
    const utf8decoder = new TextDecoder();

    const logJob = await queryLogJob.queryLogJob(
      MongoClient,
      'DEVCTMUNIX:0vxjs'
    );
    const log = logJob[0].log;
    //const log = utf8decoder.decode(encoder.encode(logJob[0].log));
    response.status(200).send({ log });
  } catch (e) {
    console.log(e);
  }
});

// httpsServer.listen(443);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
