const express  = require('express');
const router = express.Router();

const AWS = require("aws-sdk");

const dynamoOptions = process.env.NODE_ENV === "development" ? {
    region: "localhost",
    endpoint: "http://localhost:8000", 
  } : {};
const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

console.log('NODE_ENV:' + process.env.NODE_ENV);

router.get('/', (req, res) => {
    res.json({message : 'Hello World!'});
});

/**
 * GET: /users ユーザー一覧取得
 */
router.get('/users', (req, res) => {
    // res.json([{name: 'Taro'}, {name: 'Hanako'}]);
    documentClient.scan({
        TableName: 'Users'
    }).promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * GET: /user/:userId ユーザー取得
 * @param userId 取得対象ユーザーのIDを指定
 */
router.get('/user/:userId', (req, res) => {
    // res.json([{name: 'Taro'}, {name: 'Hanako'}]);
    // 本来はuserIdのvalidationチェックが必要
    documentClient.get({
        TableName: 'Users',
        Key: {
            id: parseInt(req.params.userId)
        }
    }).promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * POST: /user ユーザー作成API
 * @param {req.body} { id: id, name: 名前, age: 年齢 }
 */
router.post('/user', (req, res) => {
    // res.json([{name: 'Taro'}, {name: 'Hanako'}]);
    documentClient.put({
        TableName: 'Users',
        Item: req.body
    }).promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

module.exports = router;
