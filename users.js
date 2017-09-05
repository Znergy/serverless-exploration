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

function postUser(event, context, callback) {
  let json = JSON.parse(event.body)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'POST successful',
      data: json
    })
  })
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

module.exports = { getUsers, postUser, updateUserByID, getUserByID, deleteUserByID };
