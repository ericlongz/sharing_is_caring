module.exports = async (label) => {
  const { MongoClient } = require("mongodb");

  // Replace the uri string with your MongoDB deployment's connection string.
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);

  try {
    // connect to database server
    await client.connect();

    // query to database's table
    const database = client.db("ericlie");
    const dbCollection = database.collection("dataJobOrdered");
    const cursor = dbCollection.find({ LABEL: label }).sort({ NET_DATE: 1 });

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
