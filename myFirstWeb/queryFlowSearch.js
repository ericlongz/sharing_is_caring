module.exports = async (jobName = "") => {
  const { MongoClient } = require("mongodb");

  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://127.0.0.1:27017/";

  const client = new MongoClient(uri);

  try {
    // connect to database server
    await client.connect();

    // query to database's table
    const database = client.db("ericlie");
    const dbCollection = database.collection("flowJobInformation");
    const cursor = dbCollection.find({ JOB_NAME: jobName });

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    } else {
      //console.log(results);
    }

    // return query to array
    const results = await cursor.toArray();
    return results;
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
