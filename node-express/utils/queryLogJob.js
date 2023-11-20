const logger = require('../logger/logger');

module.exports = {
  queryLogJob: async function (MongoClient, order_id) {
    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(
      uri,
      { useUnifiedTopology: true },
      { useNewUrlParser: true },
      { connectTimeoutMS: 30000 },
      { keepAlive: 0 }
    );
    try {
      await client.connect();
      const cursor = await client.db('ericlie').collection('jobLog').find();
      const results = await cursor.toArray();

      return results;
    } catch (e) {
      //console.error(e)
      logger.error(`[ERROR] ${e}`);
    } finally {
      await client.close();
    }
  },
};
