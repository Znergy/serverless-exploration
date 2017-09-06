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

function createUser(event, context, callback) {
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

function updateUserByID(event, context, callback) {
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

function getUserByID(event, context, callback) {
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

function deleteUserByID(event, context, callback) {
  let userID = event.pathParameters.id
  if(event.pathParameters.id) {
    let params = {
      TableName: 'Users',
      Key: {
        'UserID': userID
      }
    }

    docClient.delete(params, function(err, data) {
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
            message: 'Deleted user successfully!'
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
        message: 'Missing ID!'
      })
    })
  }
}

module.exports = { getUsers, createUser, updateUserByID, getUserByID, deleteUserByID }
