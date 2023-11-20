const logger = require('./logger/logger');

module.exports = async (jobName = "") => {
  const { MongoClient } = require("mongodb");

  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://autoweb:devautoweb@devnosqldb01,devnosqldb02,devnosqldb03:28003/?authSource=dautoweb&replicaSet=rsdev2&readPreference=primary&tls=false";

  const client = new MongoClient(uri, {useUnifiedTopology: true}, {useNewUrlParser: true }, { connectTimeoutMS:10000}, {keepAlive:0} );

  try {
    // connect to database server
    await client.connect();

    // query to database's table
    const database = client.db("dautoweb");
    const dbCollection = database.collection("flowJobInformation");
    var safe = jobName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp(safe, "i");
    const cursor = dbCollection.find({ JOB_NAME: regex }).sort({ JOB_NAME: 1 });

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      //console.log("No documents found!");
	  logger.info('[INFO] No documents found!')
    } else {
      //console.log("Document(s) found!");
	  logger.info('[INFO] Documents found!')
    }

    // return query to array
    const results = await cursor.toArray();
    return results;
  } catch (err) {
    //console.log(err);
	logger.error(`[ERROR] ${err}`)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
