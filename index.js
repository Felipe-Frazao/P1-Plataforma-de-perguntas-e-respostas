const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //responsavel pela conversao dos dados enviados no formulario para JS
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")
const { where } = require("sequelize");

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
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']  //DESC = do maior para o menor e ASC = menor para maior 
    ]}).then(p => {
        res.render("index", {
            pergunt : p
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

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id : id}
    }).then(p => {
        if (p != undefined) { //se encontrada

            Resposta.findAll({
                where: {perguntaId : p.id},
                order : [['id','DESC']]
            }).then(r => {
                res.render("pergunta", { //"pergunta = pagina a ser enviada os dados"
                    pergunta : p,
                    respostas : r
            });
        });
        } else {//Nao encontrada
            res.redirect("/");
        }
    });
});

//TABELA RESPOSTA

app.post("/salvarResposta", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo : corpo,
        perguntaId : perguntaId
    }).then(()=> {
        console.log("Sua resposta foi salva");
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(8080, ()=> {
    console.log("servidor conectado!!")
});


//include("partials/header.ejs") nova maneira de uso do include para reutilizacao de codigo