const express = require('express');
const dbConnection = require('../database/config');
const cors = require('cors');

class Server {

    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();

        //ConnectionDB
        this.connectionDB()

        //Middlewares
        this.middlewares();

        //Routers
        this.routers();

    }

    async connectionDB (){
        await dbConnection()
    }

    middlewares() {
        //directorio público
        this.app.use(express.static('public'));

        //Implementación de cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
    }

    routers() {
        this.app.use('/buscar', require('../routers/buscar'));
        this.app.use('/categorias', require('../routers/categorias'));
        this.app.use('/login', require('../routers/login'));
        this.app.use('/productos', require('../routers/productos'));
        this.app.use('/roles', require('../routers/roles'));
        this.app.use('/usuarios', require('../routers/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });;
    }
}

module.exports = Server;
