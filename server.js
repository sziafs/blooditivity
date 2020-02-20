const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://blood-donation:blood-donation@blood-donation-43xtg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//css, images, js sao arquivos estaticos
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("./", {
    express:server,
    noCache: true,
});

const donors = [
    {
        name: "Felipe Silveira",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Mayk Brito",
        blood: "A-"
    },
    {
        name: "Robson Marques",
        blood: "O+"
    },
]

server.get('/', function(req, res){
    return res.render("index.html",  {donors})
});

server.post('/', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    donors.push({
        name: name,
        blood: blood,
    });

    return res.redirect("/")
});

server.listen(3000, function(){
    console.log("iniciei o servidor")
});