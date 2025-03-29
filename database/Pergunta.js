const sequelize = require('sequelize'); 
const connection = require("./database");

const Pergunta = connection.define('Pergunta', {
    titulo:{
        type: sequelize.STRING,
        allownull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allownull: false
    }
});

Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela Pergunta Criada com sucesso")
});

module.exports = Pergunta;