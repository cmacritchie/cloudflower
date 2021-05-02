var AWS = require("aws-sdk");
var DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    const params =  { TableName: 'botanyData' }

    let items =  await DynamoDB.scan(params).promise();

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(items)
        };
};