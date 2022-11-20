const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    
    // query to database's table
    const database = client.db('flowDev');
    const jobsDefCol = database.collection("jobsDef");
    
    const cursor = jobsDefCol.find({}, { _id: 0, 'JOB_NAME': 1});

    // print a message if no documents were found
    if ((await jobsDefCol.countDocuments()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);