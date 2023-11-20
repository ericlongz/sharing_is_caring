const logger = require('../logger/logger') ;

module.exports = {
    queryJobTerdaftar : async function (MongoClient, 
        ctmPlatform, ctmJobName = '.*', ctmServer = '.*', ctmGroupName = '.*', ctmApplication = '.*', ctmUserId = '.*', 
        ctmLikeInJobName, ctmLikeInServer, ctmLikeInGroupName, ctmLikeInApplication, ctmLikeInUserId, maximumNumberofResults = 20000){
        const uri = "mongodb://autoweb:devautoweb@devnosqldb01,devnosqldb02,devnosqldb03:28003/?authSource=dautoweb&replicaSet=rsdev2&readPreference=primary&tls=false";
        
        const client = new MongoClient(uri, {useUnifiedTopology: true}, {useNewUrlParser: true }, { connectTimeoutMS:30000}, {keepAlive:0} );
          try{

            if(ctmPlatform === 'MAINFRAME'){
				var ctmPlatform = 'MAINFRAME'
                var fieldJobName = 'MEMNAME'
				var ctmLikeInApplForm = '$eq'
				var ctmApplForm = ""
            }else if(ctmPlatform === 'INFORMATICA'){
				var ctmPlatform = 'OPEN SYSTEM'
                var fieldJobName = 'JOB_NAME'
				var ctmLikeInApplForm = '$eq'
				var ctmApplForm = "Informatica"
			}else if(ctmPlatform === 'SAP'){
				var ctmPlatform = 'OPEN SYSTEM'
                var fieldJobName = 'JOB_NAME'
				var ctmLikeInApplForm = '$eq'
				var ctmApplForm = "SAP R3"
			}else if(ctmPlatform == 'NETBACKUP'){
				var ctmPlatform = 'OPEN SYSTEM'
                var fieldJobName = 'JOB_NAME'
				var ctmLikeInApplForm = '$eq'
				var ctmApplForm = "NetBackup"
			}else if(ctmPlatform === 'APPLICATION INTEGRATOR'){
				var ctmPlatform = 'OPEN SYSTEM'
                var fieldJobName = 'JOB_NAME'
				var ctmLikeInApplForm = '$nin'
				var ctmApplForm = ['','CONTROL-M BIM','AFT','File Watcher','BladeLogic','Informatica','NetBackup','SAP R3']
			}else{
				var ctmPlatform = 'OPEN SYSTEM'
                var fieldJobName = 'JOB_NAME'
				var ctmLikeInApplForm = "$in"
				var ctmApplForm = ['','CONTROL-M BIM','AFT','File Watcher']
            }
			
			//update incase sesitive
			//if (ctmLikeInJobName == '$regex'){
				//var incaseCtmJobName = {
                  //      [ctmLikeInJobName]: ctmJobName, $options: 'i'
                    //}
			//}else{
				//var incaseCtmJobName = {
                  //      [ctmLikeInJobName]: ctmJobName
                    //}
			//}
						
            await client.connect();

            const cursor = await client.db("dautoweb").collection("information").find(
                {$and:[
                    {DATA_CENTER: {
                        $eq: ctmPlatform
                    }
                },
					{APPL_FORM: {
                        [ctmLikeInApplForm]: ctmApplForm
                    }
                },
                    {[fieldJobName]: {
						[ctmLikeInJobName]: ctmJobName
					}
					//incaseCtmJobName, //update incase sensitive
                },
                    {NODE_ID: {
                        [ctmLikeInServer]: ctmServer
                    }
                },
                    {GROUP_NAME: {
                        [ctmLikeInGroupName]: ctmGroupName
                    }
                },
                    {APPLICATION: {
                        [ctmLikeInApplication]: ctmApplication
                    }
                },
                    {OWNER: {
                        [ctmLikeInUserId]: ctmUserId
                    }
                }
            ] 
                    
            }).sort({JOB_NAME: 1, MEMNAME : 1}).collation({locale: 'en', strength : 2})
                .limit(maximumNumberofResults); 
    
            const results = await cursor.toArray();
    
            if(results.length > 0){
				//console.log(`Found a listing in the collection with the Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Application '${ctmLikeInApplication}', '${ctmApplication}' and Owner '${ctmLikeInUserId}', '${ctmUserId}'`);
                //console.log(results);
				logger.info(`[INFORMATION] Found a listing in the collection with the Platform '${ctmPlatform}',Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Application '${ctmLikeInApplication}', '${ctmApplication}' and Owner '${ctmLikeInUserId}', '${ctmUserId}'`)
            } else{ 
				//console.log(`No Listings found with the Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Application '${ctmLikeInApplication}', '${ctmApplication}' and Owner '${ctmLikeInUserId}', '${ctmUserId}' `)
				logger.info(`[INFORMATION] No Listings found with the Platform '${ctmPlatform}', Job Name '${ctmLikeInJobName}', '${ctmJobName}', Server '${ctmLikeInServer}', '${ctmServer}', Group Name '${ctmLikeInGroupName}', '${ctmGroupName}', Application '${ctmLikeInApplication}', '${ctmApplication}' and Owner '${ctmLikeInUserId}', '${ctmUserId}' `)
            }; 

            return results;
        } catch (e){
            //console.error(e)
			logger.error(`[ERROR] ${e}`)
        } finally {
            await client.close();
        }  
    },

    querySchedule : async function (MongoClient, ctmJobId, ctmTableId, maximumNumberofResults = 1){
        const uri = "mongodb://autoweb:devautoweb@devnosqldb01,devnosqldb02,devnosqldb03:28003/?authSource=dautoweb&replicaSet=rsdev2&readPreference=primary&tls=false";
        const client = new MongoClient(uri, {useUnifiedTopology: true}, {useNewUrlParser: true }, { connectTimeoutMS:30000}, {keepAlive:0} );
          try{
            await client.connect();
            //console.log('test');

            const cursor = await client.db("dautoweb").collection("information").find(
                {$and:[
                    {TABLE_ID: {
                        $eq: ctmTableId
                    }
                },
                    {JOB_ID: {
                        $eq:  ctmJobId
                    }
                }
            ]   
            }).sort({last_review: -1})
                .limit(maximumNumberofResults); 
    
            const results = await cursor.toArray();
    
            if(results.length > 0){
                //console.log(`Found a listing in the collection with the Job ID '${ctmJobId}' and Table ID '${ctmTableId}'`);
                //console.log(results);
            } else{ 
                //console.log(`No Listings found with the Job ID '${ctmJobId}' and Table ID '${ctmTableId}'`);
            }; 

            return results;
        } catch (e){
            console.error(e)        
        } finally {
            await client.close();
        }  
    },

    queryJumlahJob : async function (MongoClient, ctmPlatform){
        const uri = "mongodb://autoweb:devautoweb@devnosqldb01,devnosqldb02,devnosqldb03:28003/?authSource=dautoweb&replicaSet=rsdev2&readPreference=primary&tls=false";
        const client = new MongoClient(uri, {useUnifiedTopology: true}, {useNewUrlParser: true }, { connectTimeoutMS:30000}, {keepAlive:0} );
        try{
            await client.connect();

            const cursor = await client.db("dautoweb").collection("information").find(
                {DATA_CENTER: {
                        $eq: ctmPlatform
                    }
                }
            )

            const results = await cursor.toArray();

            return results;
        } catch (e){
            console.error(e)        
        } finally {
            await client.close();
        }  
    },

    queryJumlahAgent : async function (MongoClient, ctmAgentStatus){
        const uri = "mongodb://autoweb:devautoweb@devnosqldb01,devnosqldb02,devnosqldb03:28003/?authSource=dautoweb&replicaSet=rsdev2&readPreference=primary&tls=false";
        const client = new MongoClient(uri, {useUnifiedTopology: true}, {useNewUrlParser: true }, { connectTimeoutMS:30000}, {keepAlive:0} );
        try{
            await client.connect();

            const cursor = await client.db("dautoweb").collection("agent").find(
                {status : {
                        $eq: ctmAgentStatus
                    }
                }
            )

            const results = await cursor.toArray();

            return results;
        } catch (e){
            console.error(`[ERROR] '${e}'`)        
        } finally {
            await client.close();
        }  
    }

};

    