var AWS = require("aws-sdk")

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
})

var docClient = new AWS.DynamoDB.DocumentClient();

// Update
exports.handler = (event, context, callback) => {
  let json, userID, game, age, username, updatedAt, dt, data, params = null
  if(event.body) {
    json = JSON.parse(event.body)
    game = json.game
    age = json.age
    username = json.username
    userID = event.pathParameters.id
    dt = new Date()
    updatedAt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()

    params = {
      TableName: 'Users',
      Key: {
        "UserID": userID
      },
      UpdateExpression: "SET Game = :a, Age = :b, UpdatedAt = :c",
      ExpressionAttributeValues:{
        ":a": game,
        ":b": age,
        ":c": updatedAt
      },
      ReturnValues:"UPDATED_NEW"
    }
    docClient.update(params, function(err, data) {
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
          body: JSON.stringify({
            message: 'User successfully updated!',
            data: data
          })
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
        message: 'No data was passed'
      })
    })
  }
}
