const logger = require("../logger/logger");

const fs = require("fs");

module.exports = {
  queryTop10NotOkOS: async function () {
    try {
      var top10NotOkOs = fs.readFileSync(
        `./public/dataChart/chartNotOkOs.txt`,
        {
          encoding: "utf8",
        }
      );

      var fields = top10NotOkOs.split("~");
      var job_name_top_10_os = fields[0];
      var total_top_10_os = fields[1];
      return [job_name_top_10_os, total_top_10_os];
    } catch (err) {
      logger.error(`[ERROR] ${err}`);
    }
  },

  queryTop10NotOkMF: async function () {
    try {
      var top10NotOkMf = fs.readFileSync(
        `./public/dataChart/chartNotOkMf.txt`,
        {
          encoding: "utf8",
        }
      );

      var fields = top10NotOkMf.split("~");
      var job_name_top_10_mf = fields[0];
      var total_top_10_mf = fields[1];
      return [job_name_top_10_mf, total_top_10_mf];
    } catch (err) {
      logger.error(`[ERROR] ${err}`);
    }
  },
};
