const logger = require("./logger/logger");

const fs = require("fs");

module.exports = async () => {
  try {
    var optionsTahun = fs.readFileSync(`./public/dataTahun/optionsTahun.txt`, {
      encoding: "utf8",
    });
    return optionsTahun;
  } catch (err) {
    //console.log(err);
    logger.error(`[ERROR] ${err}`);
  }
};
