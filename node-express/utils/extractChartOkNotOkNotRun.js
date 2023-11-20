const logger = require("../logger/logger");

const fs = require("fs");

module.exports = async () => {
  try {
    var endedStatus = fs.readFileSync(
      `./public/dataChart/chartOkNotOkNotRun.txt`,
      {
        encoding: "utf8",
      }
    );

    var fields = endedStatus.split("~");
    var endedStatusOk = fields[0];
    var endedStatusNotOk = fields[1];
    var endedStatusNotRun = fields[2];
    var endedStatusOkWeek = fields[3];
    var endedStatusNotOkWeek = fields[4];
    var endedStatusNotRunWeek = fields[5];

    return [
      endedStatusOk,
      endedStatusNotOk,
      endedStatusNotRun,
      endedStatusOkWeek,
      endedStatusNotOkWeek,
      endedStatusNotRunWeek,
    ];
  } catch (err) {
    logger.error(`[ERROR] ${err}`);
  }
};
