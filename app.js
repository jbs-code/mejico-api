
// const dbConnection = require('./database/config');
// const express = require('express');
require('dotenv').config();
const Server = require('./server/server');

const server = new Server();

server.listen();

// const app = express();
// const port = process.env.PORT;

// //Middlewares
// app.use(express.static('public'));
// app.use(express.json());

// //iniciamos BD
// dbConnection();

// //Definimos rutas
// app.use('/usuarios', require('./routers/usuarios'));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });