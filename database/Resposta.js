const sequelize = require('sequelize'); 
const connection = require("./database");

const Resposta = connection.define('Resposta', {
    corpo: {
        type: sequelize.STRING,
        allownull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allownull: false
    }
});

Resposta.sync({force:false}).then(() =>{
    console.log("Tabela Resposta Criada com sucesso")});

module.exports = Resposta;