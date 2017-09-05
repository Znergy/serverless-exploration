function getTodolist(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Ryan Jones',
      age: 22,
      username: 'ryanjonesx'
    })
  })
}

function postTodolist(event, context, callback) {
  let json = JSON.parse(event.body);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'POST successful',
      data: json
    })
  })
}

function putTodolistByID(event, context, callback) {
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

function getTodolistByID(event, context, callback) {
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

function deleteTodolistByID(event, context, callback) {
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

module.exports = { getTodolist, postTodolist, putTodolistByID, getTodolistByID, deleteTodolistByID };
