const logger = require("../logger/logger");

const fs = require("fs");

module.exports = async () => {
  try {
    var orderHarian = fs.readFileSync(
      `./public/dataChart/chartOrderHarian.txt`,
      {
        encoding: "utf8",
      }
    );

    var fields = orderHarian.split("~");
    var orderHarianDev = fields[0];
    var totalOrderHarianDev = fields[1];
    var orderHarianProd = fields[2];
    var totalOrderHarianProd = fields[3];
    var last_Sync = fields[4];

    return [
      orderHarianDev,
      totalOrderHarianDev,
      orderHarianProd,
      totalOrderHarianProd,
      last_Sync,
    ];
  } catch (err) {
    logger.error(`[ERROR] ${err}`);
  }
};
