'use strict';

// module.exports = {
//
//   hello: function(event, context, callback) {
//     if(event.pathParameters && event.pathParameters.name) {
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: `Hello, ${event.pathParameters.name}`
//         })
//       })
//     } else {
//       const response = {
//         statusCode: 200,
//         headers: {
//           "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
//           "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
//         },
//         body: JSON.stringify({
//           message: 'Working! Your function executed successfully!',
//           input: event,
//         }),
//       };
//
//       callback(null, response);
//     }
//   },
//   hello1: function(event, context, callback) {
//     if(event.pathParameters && event.pathParameters.name) {
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: `Hello, ${event.pathParameters.name}`
//         })
//       })
//     }
//   }
//
//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };

/** Another way of writing multiple functions **/
function hello(event, context, callback) {
  if(event.pathParameters && event.pathParameters.name) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${event.pathParameters.name}`
      })
    })
  } else {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        message: 'Working! Your function executed successfully!',
        input: event,
      }),
    };

    callback(null, response);
  }
}

function hello1(event, context, callback) {
  // local testing
  if(event.pathParameters && event.pathParameters.name) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${event.pathParameters.name}`
      })
    })
  } else if(event.queryStringParameters && event.queryStringParameters.name) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${event.queryStringParameters.name}`,
        method: 'POST'
      })
    })
  } else {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        message: 'Working! Your function executed successfully!',
        input: event,
      }),
    };

    callback(null, response);
  }
}

function todolist(event, context, callback) {
  if(event.httpMethod === "GET") {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: { name: 'Ryan Jones', age: 22 },
        method: 'GET'
      })
    })
  }

  if(event.httpMethod === "POST" && event.body) {
    let json = JSON.parse(event.body);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'I have recieved a JSON Object from you!',
        method: 'POST',
        data: json
      })
    })
  }
}

module.exports = { hello, hello1, todolist };
