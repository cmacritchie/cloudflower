var AWS = require("aws-sdk");
var DynamoDB = new AWS.DynamoDB.DocumentClient();

//const TableName = process.env.TABLE_NAME //doesn't do anything at the moment

exports.lambdaHandler = async (event, context) => {
    const body = JSON.parse(event.body)

    const newFlower = {
        id: context.awsRequestId,
        sepal_length: body.sepal_length,
        sepal_width: body.sepal_width,
        petal_length: body.petal_length,
        petal_width: body.petal_width,
        flower_type: body.flower_type
    }

    try{
        await DynamoDB.put({
            TableName: 'botanyData',
            Item: newFlower
        }).promise()
        return {
            statusCode: 200,
            headers:{
                "Access-Control-Allow-Origin" : "*",
            },
            body: JSON.stringify(newFlower)
        };
    }
    catch(err){
        return {statusCode: 500, body: JSON.stringify(err)
        };
    }
};