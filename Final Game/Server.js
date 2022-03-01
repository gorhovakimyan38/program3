var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.redirect('index.html')
});

server.listen(3002);


grassArr = []
grassEaterArr = []
predatorArr = []
cactusArr = []
humanArr = []
matrix = []



Grass = require('./Grass')
GrassEater = require('./GrassEater')
Predator = require('./Predator')
Cactus = require('./Cactus')
Human = require('./Human')

var n = 50

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))
        
    }  
}

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

function changeWeather() {
    weat();
}
socket.on ('weather', function(data){
    weather1 = data;
    document.getElementById("weather").innerHTML = weather1;
    document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
   
      changer();
})


io.on('connection', function (socket) {
    createObject();
});