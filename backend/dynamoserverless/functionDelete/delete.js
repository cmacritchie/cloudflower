var AWS = require("aws-sdk");
var DynamoDB = new AWS.DynamoDB.DocumentClient();

//const TableName = process.env.TABLE_NAME //doesn't do anything at the moment

exports.lambdaHandler = async (event, context) => {
    await DynamoDB.delete({
        TableName: 'botanyData',
        Key: {
            id: event.pathParameters.id
        }
    }).promise()
    return { 
        statusCode: 200,  
        headers:{
                "Access-Control-Allow-Origin" : "*",
        },
        body:event.pathParameters.id 
    };
};