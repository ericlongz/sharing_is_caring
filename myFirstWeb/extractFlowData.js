const fs = require("fs");
var initial = fs.readFileSync(`public/data/initial.txt`, {
  encoding: "utf8",
});

module.exports = (applicationGroup = `${initial}`) => {
  var options = fs.readFileSync(`public/data/options.txt`, {
    encoding: "utf8",
  });
  var nodeData = fs.readFileSync(
    `public/data/nodeData${applicationGroup}.json`,
    {
      encoding: "utf8",
    }
  );
  var linkData = fs.readFileSync(
    `public/data/linkData${applicationGroup}.json`,
    {
      encoding: "utf8",
    }
  );
  return [options, nodeData, linkData];
};
