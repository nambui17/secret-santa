const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
console.log(process.env)


// const api = new ParseServer({
//     databaseURI: 'mongodb://your.mongo.uri',
//     cloud: './cloud/main.js',
//     appId: 'myAppId',
//     fileKey: 'myFileKey',
//     masterKey: 'mySecretMasterKey',
//     push: { ... }, // See the Push wiki page
//     filesAdapter: ...,
//     filesUpload: {
//       enableForAuthenticatedUser: true
//     }
//   });