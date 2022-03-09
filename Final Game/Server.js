var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.redirect('index.html')
});

server.listen(3003);


grassArr = []
grassEaterArr = []
predatorArr = []
cactusArr = []
humanArr = []



Grass = require('./Grass')
GrassEater = require('./GrassEater')
Predator = require('./Predator')
Cactus = require('./Cactus')
Human = require('./Human')

function generator(matLen, gr, grEat, pred, cact, hum) {
    matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < cact; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < hum; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

matrix = generator(50, 10, 8, 6, 4, 3);


io.sockets.emit('send matrix', matrix)

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1))
            }
            if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
            if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y, 3))
            }
            if (matrix[y][x] == 4) {
                cactusArr.push(new Cactus(x, y, 4))
            }
            if (matrix[y][x] == 5) {
                humanArr.push(new Human(x, y, 5))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}
function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (let i in cactusArr) {
        cactusArr[i].eat()
    }
    for (let i in humanArr) {
        humanArr[i].eat()
    }
    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 500)


function gameStat() {
    count = {
        grass:grassArr.length,
        grassEater:grassEaterArr.length,
        predator:predatorArr.length,
        cactus:cactusArr.length,
        human:humanArr.length,
    }
    fs.writeFile('statistics.json', JSON.stringify(count), ()=>{
        io.sockets.emit('send state', count)
    })
}

setInterval(gameStat, 300)


io.on('connection', function () {
    createObject();
});


// functions 

function winter () {
    background='white'
}
io.sockets.emit('send matrix', matrix)
var wint = document.getElementById('1')
wint = winter;

function spring () {
    background='green'
}
io.sockets.emit('send matrix', matrix)
var sprg = document.getElementById('2')
sprg = spring;

function summer () {
    background='red'
}
io.sockets.emit('send matrix', matrix)
var summr = document.getElementById('3')
summr = summer;

function autumn () {
    background='yellow'
}
io.sockets.emit('send matrix', matrix)
var autm = document.getElementById('4')
autm = autumn;



function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
}
io.sockets.emit('send matrix', matrix)
var addgr = document.getElementById('5')
addgr = addGrass;

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            var gr = new GrassEater(x, y, 1)
            grassEaterArr.push(gr)
        }
    }
}
io.sockets.emit('send matrix', matrix)
var addgre = document.getElementById('6')
addgre = addGrassEater; 

function addPredator() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var gr = new Predator(x, y, 1)
            predatorArr.push(gr)
        }
    }
}
io.sockets.emit('send matrix', matrix)
var addpre = document.getElementById('7')
addpre = addPredator; 

function addCactus() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            var gr = new Cactus(x, y, 1)
            cactusArr.push(gr)
        }
    }
}
io.sockets.emit('send matrix', matrix)
var addc = document.getElementById('8')
addc = addCactus;

function addHuman() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var gr = new Human(x, y, 1)
            humanArr.push(gr)
        }
    }
}
io.sockets.emit('send matrix', matrix)
var addhmn = document.getElementById('9')
addhmn = addHuman;

function bomb () {
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    cactusArr = []
    humanArr = []
}
io.sockets.emit('send matrix', matrix)
var bomba = document.getElementById('10')
bomba = bomb;

function supchar () {
     var spc = Math.floor(rand(2,5))
    if(spc == 2) {
    var randg = rand(grassEaterArr.length)
    randg(this.energy+=100)
    }
    if(spc == 3) {
        var randp = rand(predatorArr.length)
    randp(this.energy+=100)
    }
    if(spc == 4) {
        var randc = rand(cactusArr.length)
    randc(this.energy+=100)
    }
    if(spc == 5) {
        var randh = rand(humanArr.length)
    randh(this.energy+=100)
    }
}
io.sockets.emit('send matrix', matrix)
var spch = document.getElementById('11')
spch = supchar; 
