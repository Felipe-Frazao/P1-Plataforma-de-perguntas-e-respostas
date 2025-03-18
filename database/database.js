const sequelize = require('sequelize');                                                             
const connection = new sequelize(
    'guiaPergunta', //nome banco
    'root', //usuario
    '4752', //senha
    {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports = connection;
