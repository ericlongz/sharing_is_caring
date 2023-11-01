//const logger = require('../logger/logger') ;

module.exports = {
  queryJobStatistic: async function (
    MongoClient,
    ctmTahun,
    ctmBulan,
    ctmPlatform,
    ctmJobName = '.*',
    ctmServer = '.*',
    ctmGroupName = '.*',
    ctmUserId = '.*',
    ctmTableName = '.*',
    ctmEndedStatus = '.*',
    ctmLikeInJobName,
    ctmLikeInServer,
    ctmLikeInGroupName,
    ctmLikeInUserId,
    ctmLikeInTableName,

    ctmFromOdate,
    ctmFromOdateYYYY = '.*',
    ctmFromOdateMM = '.*',
    ctmFromOdateDD = '.*',
    ctmUntilOdate,
    ctmUntilOdateYYYY = '.*',
    ctmUntilOdateMM = '.*',
    ctmUntilOdateDD = '.*',

    ctmFromStartDate,
    ctmFromStartDateYYYY = '.*',
    ctmFromStartDateMM = '.*',
    ctmFromStartDateDD = '.*',
    ctmUntilStartDate,
    ctmUntilStartDateYYYY = '.*',
    ctmUntilStartDateMM = '.*',
    ctmUntilStartDateDD = '.*',

    ctmFromStartTime,
    ctmFromStartTimeHH = '.*',
    ctmFromStartTimeMM = '.*',
    ctmFromStartTimeSS = '.',
    ctmUntilStartTime,
    ctmUntilStartTimeHH = '.*',
    ctmUntilStartTimeMM = '.*',
    ctmUntilStartTimeSS = '.*',

    ctmFromEndDate,
    ctmFromEndDateYYYY = '.*',
    ctmFromEndDateMM = '.*',
    ctmFromEndDateDD = '.*',
    ctmUntilEndDate,
    ctmUntilEndDateYYYY = '.*',
    ctmUntilEndDateMM = '.*',
    ctmUntilEndDateDD = '.*',

    ctmFromEndTime,
    ctmFromEndTimeHH = '.*',
    ctmFromEndTimeMM = '.*',
    ctmFromEndTimeSS = '.*',
    ctmUntilEndTime,
    ctmUntilEndTimeHH = '.*',
    ctmUntilEndTimeMM = '.*',
    ctmUntilEndTimeSS = '.*',

    maximumNumberofResults = 20000
  ) {
    const start = Date.now();
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(
      uri,
      { useUnifiedTopology: true },
      { useNewUrlParser: true },
      { connectTimeoutMS: 30000 },
      { keepAlive: 0 }
    );
    try {
      //if else EndedStatus
      if (ctmEndedStatus === '.*') {
        var ctmLikeInEndedStatus = '$regex';
      } else {
        var ctmLikeInEndedStatus = '$eq';
      }

      //if else ctmFromOdate
      if (ctmFromOdateYYYY + ctmFromOdateMM + ctmFromOdateDD === '') {
        var ctmFromOdateYDM = '.*';
        ctmFromOdate = '$regex';
      } else {
        var ctmFromOdateYDM =
          ctmFromOdateYYYY + ctmFromOdateMM + ctmFromOdateDD;
      }

      //if else ctmUntilOdate
      if (ctmUntilOdateYYYY + ctmUntilOdateMM + ctmUntilOdateDD === '') {
        var ctmUntilOdateYDM = '.*';
        ctmUntilOdate = '$regex';
      } else {
        var ctmUntilOdateYDM =
          ctmUntilOdateYYYY + ctmUntilOdateMM + ctmUntilOdateDD;
      }

      //if else ctmFromStartDate
      if (
        ctmFromStartDateYYYY +
          '-' +
          ctmFromStartDateMM +
          '-' +
          ctmFromStartDateDD ===
        '--'
      ) {
        var ctmFromStartDateYDM = '.*';
        ctmFromStartDate = '$regex';
      } else {
        var ctmFromStartDateYDM =
          ctmFromStartDateYYYY +
          '-' +
          ctmFromStartDateMM +
          '-' +
          ctmFromStartDateDD;
      }

      //if else ctmUntilStartDate
      if (
        ctmUntilStartDateYYYY +
          '-' +
          ctmUntilStartDateMM +
          '-' +
          ctmUntilStartDateDD ===
        '--'
      ) {
        var ctmUntilStartDateYDM = '.*';
        ctmUntilStartDate = '$regex';
      } else {
        var ctmUntilStartDateYDM =
          ctmUntilStartDateYYYY +
          '-' +
          ctmUntilStartDateMM +
          '-' +
          ctmUntilStartDateDD;
      }

      //if else ctmFromStartTime
      if (
        ctmFromStartTimeHH +
          ':' +
          ctmFromStartTimeMM +
          ':' +
          ctmFromStartTimeSS ===
        '::'
      ) {
        var ctmFromStartTimeHMS = '.*';
        ctmFromStartTime = '$regex';
      } else {
        var ctmFromStartTimeHMS =
          ctmFromStartTimeHH +
          ':' +
          ctmFromStartTimeMM +
          ':' +
          ctmFromStartTimeSS;
      }

      //if else ctmUntilStartTime
      if (
        ctmUntilStartTimeHH +
          ':' +
          ctmUntilStartTimeMM +
          ':' +
          ctmUntilStartTimeSS ===
        '::'
      ) {
        var ctmUntilStartTimeHMS = '.*';
        ctmUntilStartTime = '$regex';
      } else {
        var ctmUntilStartTimeHMS =
          ctmUntilStartTimeHH +
          ':' +
          ctmUntilStartTimeMM +
          ':' +
          ctmUntilStartTimeSS;
      }

      //if else ctmFromEndDate
      if (
        ctmFromEndDateYYYY + '-' + ctmFromEndDateMM + '-' + ctmFromEndDateDD ===
        '--'
      ) {
        var ctmFromEndDateYDM = '.*';
        ctmFromEndDate = '$regex';
      } else {
        var ctmFromEndDateYDM =
          ctmFromEndDateYYYY + '-' + ctmFromEndDateMM + '-' + ctmFromEndDateDD;
      }

      //if else ctmUntilEndDate
      if (
        ctmUntilEndDateYYYY +
          '-' +
          ctmUntilEndDateMM +
          '-' +
          ctmUntilEndDateDD ===
        '--'
      ) {
        var ctmUntilEndDateYDM = '.*';
        ctmUntilEndDate = '$regex';
      } else {
        var ctmUntilEndDateYDM =
          ctmUntilEndDateYYYY +
          '-' +
          ctmUntilEndDateMM +
          '-' +
          ctmUntilEndDateDD;
      }

      //if else ctmFromEndTime
      if (
        ctmFromEndTimeHH + ':' + ctmFromEndTimeMM + ':' + ctmFromEndTimeSS ===
        '::'
      ) {
        var ctmFromEndTimeHMS = '.*';
        ctmFromEndTime = '$regex';
      } else {
        var ctmFromEndTimeHMS =
          ctmFromEndTimeHH + ':' + ctmFromEndTimeMM + ':' + ctmFromEndTimeSS;
      }

      //if else ctmUntilEndTime
      if (
        ctmUntilEndTimeHH +
          ':' +
          ctmUntilEndTimeMM +
          ':' +
          ctmUntilEndTimeSS ===
        '::'
      ) {
        var ctmUntilEndTimeHMS = '.*';
        ctmUntilEndTime = '$regex';
      } else {
        var ctmUntilEndTimeHMS =
          ctmUntilEndTimeHH + ':' + ctmUntilEndTimeMM + ':' + ctmUntilEndTimeSS;
      }

      //update incase sesitive
      //if (ctmLikeInJobName == '$regex'){
      //var incaseCtmJobName = {
      //      [ctmLikeInJobName]: ctmJobName, $options: 'i'
      //}
      //}else{
      //var incaseCtmJobName = {
      //      [ctmLikeInJobName]: ctmJobName
      //}
      //}

      await client.connect();

      const cursor = await client
        .db('ericlie')
        .collection('statistic' + '_' + ctmTahun + '_' + ctmBulan)
        .find()
        .limit(maximumNumberofResults);
      // .find({
      //   $and: [
      //     {
      //       DATA_CENTER: {
      //         $regex: ctmPlatform,
      //       },
      //     },
      //     {
      //       JOB_MEM_NAME: {
      //         [ctmLikeInJobName]: ctmJobName,
      //       }, //incaseCtmJobName
      //     },
      //     {
      //       NODE_ID: {
      //         [ctmLikeInServer]: ctmServer,
      //       },
      //     },
      //     {
      //       GROUP_NAME: {
      //         [ctmLikeInGroupName]: ctmGroupName,
      //       },
      //     },
      //     {
      //       OWNER: {
      //         [ctmLikeInUserId]: ctmUserId,
      //       },
      //     },
      //     {
      //       SCHED_TABLE: {
      //         [ctmLikeInTableName]: ctmTableName,
      //       },
      //     },
      //     {
      //       ENDED_STATUS: {
      //         [ctmLikeInEndedStatus]: ctmEndedStatus,
      //       },
      //     },
      //     {
      //       ORDER_DATE: {
      //         [ctmFromOdate]: ctmFromOdateYDM,
      //       },
      //     },
      //     {
      //       ORDER_DATE: {
      //         [ctmUntilOdate]: ctmUntilOdateYDM,
      //       },
      //     },
      //     {
      //       START_DATE: {
      //         [ctmFromStartDate]: ctmFromStartDateYDM,
      //       },
      //     },
      //     {
      //       START_DATE: {
      //         [ctmUntilStartDate]: ctmUntilStartDateYDM,
      //       },
      //     },
      //     {
      //       START_TIME: {
      //         [ctmFromStartTime]: ctmFromStartTimeHMS,
      //       },
      //     },
      //     {
      //       START_TIME: {
      //         [ctmUntilStartTime]: ctmUntilStartTimeHMS,
      //       },
      //     },
      //     {
      //       END_DATE: {
      //         [ctmFromEndDate]: ctmFromEndDateYDM,
      //       },
      //     },
      //     {
      //       END_DATE: {
      //         [ctmUntilEndDate]: ctmUntilEndDateYDM,
      //       },
      //     },
      //     {
      //       END_TIME: {
      //         [ctmFromEndTime]: ctmFromEndTimeHMS,
      //       },
      //     },
      //     {
      //       END_TIME: {
      //         [ctmUntilEndTime]: ctmUntilEndTimeHMS,
      //       },
      //     },
      //   ],
      // })
      // .limit(maximumNumberofResults)
      // .sort({ START_DATE: -1, START_TIME: -1 });

      const results = await cursor.toArray();

      // console.log(results);

      if (results.length > 0) {
        console.log('ada hasil');
        //console.log(`Found a listing in the collection with the Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Table '${ctmLikeInTableName}', '${ctmTableName}' and Owner '${ctmLikeInUserId}', '${ctmUserId}' `);
        //     logger.info(
        //       `[STATISTIC] Found a listing in the collection with the Tahun '${ctmTahun}' Bulan '${ctmBulan}' Platform '${ctmPlatform}', Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Table '${ctmLikeInTableName}', '${ctmTableName}', Owner '${ctmLikeInUserId}', '${ctmUserId}', Ended Status '${ctmLikeInEndedStatus}','${ctmEndedStatus}', From Order Date '${ctmFromOdate}', '${ctmFromOdateYDM}' Until Order Date ''${ctmUntilOdate},'${ctmUntilOdateYDM}', 	From Start Date '${ctmFromStartDate}', '${ctmFromStartDateYDM}' Until Start Date '${ctmUntilStartDate}','${ctmUntilStartDateYDM}',Start Time '${ctmFromStartTime}', '${ctmFromStartTimeHMS}' Until Start Time ${ctmUntilStartTime}, '${ctmUntilStartTimeHMS}', 	From End Date '${ctmFromEndDate}','${ctmFromEndDateYDM}' Until End Date '${ctmUntilEndDate}','${ctmUntilEndDateYDM}',From End Time '${ctmFromEndTime}', '${ctmFromEndTimeHMS}' Until End Time '${ctmUntilEndTime}','${ctmUntilEndTimeHMS}'`
        //     );
        //     //console.log(results);
      } else {
        console.log('tidak ada hasil');
        //     //console.log(`No Listings found with the Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Table '${ctmLikeInTableName}', '${ctmTableName}' and Owner '${ctmLikeInUserId}', '${ctmUserId}' `)
        //     logger.info(
        //       `[STATISTIC] No Listings found in the collection with the Tahun '${ctmTahun}' Bulan '${ctmBulan}' Platform '${ctmPlatform}', Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Table '${ctmLikeInTableName}', '${ctmTableName}', Owner '${ctmLikeInUserId}', '${ctmUserId}', Ended Status '${ctmLikeInEndedStatus}','${ctmEndedStatus}', From Order Date '${ctmFromOdate}', '${ctmFromOdateYDM}' Until Order Date ''${ctmUntilOdate},'${ctmUntilOdateYDM}', 	From Start Date '${ctmFromStartDate}', '${ctmFromStartDateYDM}' Until Start Date '${ctmUntilStartDate}','${ctmUntilStartDateYDM}',Start Time '${ctmFromStartTime}', '${ctmFromStartTimeHMS}' Until Start Time ${ctmUntilStartTime}, '${ctmUntilStartTimeHMS}', 	From End Date '${ctmFromEndDate}','${ctmFromEndDateYDM}' Until End Date '${ctmUntilEndDate}','${ctmUntilEndDateYDM}',From End Time '${ctmFromEndTime}', '${ctmFromEndTimeHMS}' Until End Time '${ctmUntilEndTime}','${ctmUntilEndTimeHMS}'`
        //     );
      }

      const end = Date.now();
      console.log(`Execution time: ${end - start} ms`);
      return results;
    } catch (e) {
      console.error(e);
      //   logger.error(`[ERROR] ${e}`);
    } finally {
      await client.close();
    }
  },
};
