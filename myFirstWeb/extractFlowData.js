module.exports = (applicationGroup = "A") => {
  const fs = require("fs");
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
  return [nodeData, linkData];
};
