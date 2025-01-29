const express = require("express")
const app = express()


//informando ao express que e para utilizar o EJS como principal view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //Arquivos staticos

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.listen(8080, ()=> {
    console.log("servidor conectado!!")
});

//include("partials/header.ejs") nova maneira de uso do include para reutilizacao de codigo