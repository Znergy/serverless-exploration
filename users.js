var AWS = require("aws-sdk")

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
})

var docClient = new AWS.DynamoDB.DocumentClient()

function getUsers(event, context, callback) {

  let params = {
    TableName: 'Users'
  }

  docClient.scan(params, onScan)

  function onScan(err, data) {
    if (err) {
      callback(null, {
        statusCode: 402,
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
        body: JSON.stringify({
          data: data
        })
      })
    }
  }
}

function createUser(event, context, callback) {
  let json, userID, game, age, username, data, params = null
  if(event.body) {
    json = JSON.parse(event.body)
    userID = json.id
    game = json.game
    age = json.age
    username = json.username

    data = {
      'UserID': userID,
      'Game': game,
      'Age': age,
      'Username': username
    }

    params = {
      TableName: 'Users',
      Item: {
        'UserID': userID,
        'Game': game,
        'Age': age,
        'Username': username
      }
    }
    docClient.put(params, function(err, data) {
      if (err) {
        callback(null, {
          statusCode: 402,
          body: JSON.stringify({
            message: err
          })
        })
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'User successfully created!',
            data: data
          })
        })
      }
    })
  } else {
    callback(null, {
      statusCode: 404,
      body: JSON.stringify({
        message: 'No data was passed'
      })
    })
  }
}

function updateUserByID(event, context, callback) {
  let id = event.pathParameters.id

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'PUT /:id successful',
      event: event,
      id: id
    })
  })
}

function getUserByID(event, context, callback) {
  let id = event.pathParameters.id

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GET /:id successful',
      event: event,
      id: id
    })
  })
}

function deleteUserByID(event, context, callback) {
  let id = event.pathParameters.id

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'DELETE /:id successful',
      event: event,
      id: id
    })
  })
}

module.exports = { getUsers, createUser, updateUserByID, getUserByID, deleteUserByID }
