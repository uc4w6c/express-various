# Serverless
## 設定
$ npm init
$ npm install express --save
$ npm install @vendia/serverless-express

## deploy
$ sls deploy

## DynamoDB
$ docker pull amazon/dynamodb-local
$ docker run -d --name dynamodb -p 8000:8000 amazon/dynamodb-local

$ node script/create-table.js
$ aws dynamodb list-tables --endpoint-url http://localhost:8000
$ aws dynamodb describe-table --table-name users --endpoint-url http://localhost:8000
-> なぜか取得できない。。。

$ npm install aws-sdk
