var AWS = require("aws-sdk")

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
})

var docClient = new AWS.DynamoDB.DocumentClient();

// Create
exports.handler = (event, context, callback) => {
  let json, userID, game, age, username, date, dt, customData, params = null
  if(event.body) {
    json = JSON.parse(event.body)
    userID = Math.round(Math.random() * 150) + 'afd'
    game = json.game
    age = json.age
    username = json.username
    dt = new Date()
    date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()

    customData = {
      'UserID': userID,
      'Username': username,
      'CreatedAt': date,
      'Game': game,
      'Age': age
    }

    params = {
      TableName: 'Users',
      Item: {
        'UserID': userID,
        'Username': username,
        'CreatedAt': date,
        'Game': game,
        'Age': age
      }
    }
    docClient.put(params, function(err, data) {
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
            message: 'User successfully created!',
            data: customData
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
