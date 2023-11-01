# import requests

# endPoint = 'https://olndctmapp01:8443/automation-api'
# token = '7ACDADAF8BA316D1D1F7C37F97E2FF6414F042C45A376A0B697976E28259582D34EF857B74DC3D871C983FDC90EB09697813E6FA36C47CA282D1075DF4FFC77C'

# # get job output (criteria runNo, default last one or runNo=1)
# jobId = "DEVCTMUNIX:0v0tn"
# runNo = "?runNo=00001"
# r_getJobOutput = requests.get(endPoint + '/run/job/{jobId}/output/{runNo}'.format(jobId=jobId, runNo=runNo), headers={'Authorization': 'Bearer ' + token}, verify=False)
# #print(r_getJobOutput.content)
# print(r_getJobOutput.status_code)
# print(r_getJobOutput.content.decode("utf-8"))

# import pymongo

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["ericlie"]
# mycol = mydb["customers"]

# mydict = { "name": "John", "address": "Highway 37" }

# x = mycol.insert_one(mydict)

