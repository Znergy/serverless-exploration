var AWS = require("aws-sdk")

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
})

var docClient = new AWS.DynamoDB.DocumentClient();

// getUserByID
exports.handler = (event, context, callback) => {
  let userID = event.pathParameters.id
  if(event.pathParameters.id) {
    let params = {
      TableName: 'Users',
      Key: {
        'UserID': userID
      }
    }

    docClient.get(params, function(err, data) {
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
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
          },
          body: JSON.stringify(data)
        })
      }
    })
  } else {
    callback(null, {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        message: 'Missing ID!'
      })
    })
  }
}
