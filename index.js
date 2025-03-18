const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //responsavel pela conversao dos dados enviados no formulario para JS
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");

//Database
    
connection
.authenticate()
.then(()=> {
    console.log("Conexao estabelecida com sucesso");
}).catch((msgErro) => {
    console.log(msgErro);
})

//informando ao express que e para utilizar o EJS como principal view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //Arquivos staticos



app.use(bodyParser.urlencoded({extended: false})); //decodificar os dados enviados pelo formulario
app.use(bodyParser.json());//Permiti a leitura de dados enviados via json utilizado com API


//Rotas
//CONSULTA
app.get("/", (req,res) => {
    Pergunta.findAll({raw: true}).then(perguntas => {
        res.render("index", {
            perguntas : perguntas
        });
    });
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

//INSERIR
app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.listen(8080, ()=> {
    console.log("servidor conectado!!")
});


//include("partials/header.ejs") nova maneira de uso do include para reutilizacao de codigo