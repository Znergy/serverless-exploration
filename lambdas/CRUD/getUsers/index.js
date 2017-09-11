var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  let params = {
    TableName: 'Users'
  }

  docClient.scan(params, onScan)

  function onScan(err, data) {
    if (err) {
      callback(null, {
        statusCode: 402,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          message: err
        })
      })
    } else {
      console.log("Scan succeeded.")
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...")
        params.ExclusiveStartKey = data.LastEvaluatedKey
        docClient.scan(params, onScan)
      }
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          data: data
        })
      })
    }
  }
}
