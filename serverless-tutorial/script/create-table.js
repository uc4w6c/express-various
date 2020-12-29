// ローカル環境で
const AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000", 
});

const dynamoDB = new AWS.DynamoDB();

const params = {
    TableName : "Users",
    KeySchema: [
        { AttributeName: "id",   KeyType: "HASH"} // ,
        // { AttributeName: "name", KeyType: "RANGE"},
        // { AttributeName: "age",  KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        { AttributeName: "id",   AttributeType: "N" } //,
        // ここでテーブル作成する際には以下のようなキー以外の属性は不要
        // { AttributeName: "name", AttributeType: "S" },
        // { AttributeName: "age",  AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
}

dynamoDB.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
    }
})
