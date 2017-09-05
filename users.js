var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

function getUsers(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          name: 'Ryan Jones',
          age: 22,
          username: 'ryanjonesx'
        },
        {
          name: 'Tyler Jones',
          age: 25,
          username: 'tylerjonesx'
        },
        {
          name: 'Crystal Jones',
          age: 28,
          username: 'crystaljonesx'
        }
      ]
    )
  })
}

function createUser(event, context, callback) {
  let json, userID, game, age, username = null
  if(event.body) {
    json = JSON.parse(event.body)
    userID = json.id
    game = json.game
    age = json.age
    username = json.username
  }

  var params = {
      TableName: 'Users',
      Item: {
          'UserID': userID,
          'Game': game,
          'Age': age,
          'Username': username
      }
  };

  docClient.put(params, function(err, data) {
      if (err) {
        callback(null, {
          statusCode: 402,
          body: JSON.stringify({
            message: err
          })
        })
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'User successfully created!',
          data: params
        })
      })
  });
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

module.exports = { getUsers, createUser, updateUserByID, getUserByID, deleteUserByID };
