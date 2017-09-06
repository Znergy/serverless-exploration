# Cool stuff with the Serverless Framework

#### By: Ryan Jones
#### Version: 09/04/2017

## Description
Creating a CRUD RESTful API with Lambda + API Gateway, DynamoDB table with two GSI's, and an S3 bucket using the Serverless Framework and CloudFormation. I'm also looking into various ways to test lambda both locally and hopefully achieve some automated testing as well.

## Cool Stuff
I'm diving a lot deeper into the serverless framework and seeing the crazy possibility it brings, I've started also diving deeper into CloudFormation which has blown my mind. The idea that I can write all of my infrastructure in a single file and just run 'sls deploy', is incredible! I've been aware of this from a distance for a long time, but actually writing it and seeing the result is so much different. I've usually taken the manual route due to the overwhelming nature of all of the different pieces, but it's not that bad. Awesome!

## Working with Lambda Proxy Integration
A cool part about creating AWS microservices in a different way using Lambda Proxy Integration, is the idea of having to write HTTP requests and responses in a different way. With Lambda Proxy Integration, everything is passed to the Lambda function where in the way I've always done it in the past was mapping the inputs (e.g. path parameters) into the exact request body in API Gateway.

An issue I ran into multiple times was a 502 server error coming through when testing with Postman. However, when I would do local tests with serverless using 'sls invoke local -f function_name' it would work fine. This had to do with the way Lambda Proxy Integration is set up, where if you don't send back the proper response in your lambda function the 502 error is pretty likely.

Also I would like to mention that I had to set up CORS in the cloudformation template (or serverless.yml file) and also had to specify CORS headers when constructing responses in my Lambda functions. Something that I thought was covered by just stating 'cors: true' under each function in the serverless.yml file. Regardless, once the headers were set on each response, the browser was able to successfully receive a response from API Gateway.

Below is how an AJAX call would make a request to the POST API. What I thought was interesting was that 'data' in the AJAX request mapped perfectly to 'event.body' in my Lambda function something that I was curious about since the name is 'data' not 'body'. Which totally makes sense now, but wasn't immediately clear with the other components involved in making this request.

## Test HTTP Request (POST)
```
var data = {
  "username": "destro123",
  "game": "CSGO",
  "age": 25
}

$.ajax({
  method: 'POST',
  url: 'https://1vuwqxptmf.execute-api.us-west-2.amazonaws.com/dev/api/v1/users',
  data: JSON.stringify(data),
  contentType: 'application/json',
  success: function(res) {
    console.log(res)
  },
  error: function(err) {
    console.log(err)
  }
})
```

## Woking with Serverless
I love the Serverless Framework and I don't think I'll ever not use it again when working with Lambda. It's amazing, not only can I write my entire infrastructure of Lambdas + API Gateways, but I can also create DynamoDB tables, S3 Buckets, IAM Roles, practically anything I need all by launching a single file. Infrastructure as code, finally I can really express what this means by showing real examples. It's so awesome!
