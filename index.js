const express = require("express")
const app = express();
const bodyParser = require("body-parser"); //responsavel pela conversao dos dados enviados no formulario para JS

//informando ao express que e para utilizar o EJS como principal view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //Arquivos staticos

app.use(bodyParser.urlencoded({extended: false})); //decodificar os dados enviados pelo formulario
app.use(bodyParser.json());//Permiti a leitura de dados enviados via json utilizado com API

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});

app.listen(8080, ()=> {
    console.log("servidor conectado!!")
});


//include("partials/header.ejs") nova maneira de uso do include para reutilizacao de codigo