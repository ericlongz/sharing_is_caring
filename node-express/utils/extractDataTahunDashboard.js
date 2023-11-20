const logger = require("../logger/logger");

const fs = require("fs");

module.exports = async () => {
  try {
    var optionsTahunDashboard = fs.readFileSync(
      `./public/dataTahun/optionsTahunDashboard.txt`,
      {
        encoding: "utf8",
      }
    );
    return optionsTahunDashboard;
  } catch (err) {
    //console.log(err);
    logger.error(`[ERROR] ${err}`);
  }
};
