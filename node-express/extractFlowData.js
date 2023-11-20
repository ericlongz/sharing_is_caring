const logger = require('./logger/logger');

const fs = require("fs");

try {
	var initial = fs.readFileSync(`./public/dataFlow/initial.txt`, {
	  encoding: "utf8",
})} catch (err) {
	logger.error(`[ERROR] ${err}`);
};

module.exports = async (applicationGroup = `${initial}`) => {
  try {
    var options = fs.readFileSync(`./public/dataFlow/options.txt`, {
      encoding: "utf8",
    });
    var nodeData = fs.readFileSync(
      `./public/dataFlow/nodeData${applicationGroup}.json`,
      {
        encoding: "utf8",
      }
    );
    var linkData = fs.readFileSync(
      `./public/dataFlow/linkData${applicationGroup}.json`,
      {
        encoding: "utf8",
      }
    );
    return [options, nodeData, linkData, applicationGroup];
  } catch (err) {
	logger.error(`[ERROR] ${err}`);
  }
};