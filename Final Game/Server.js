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

function generator(matLen, gr, grEat, pred, cact, hum) {
    let matrix = [];
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
matrix = generator(30, 1, 1, 1, 1, 1);
io.sockets.emit('send matrix', matrix)

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
var w1 = 'no weather'
function weather(weather) {
    if(weather == 1){
       w1 = 'spring'
    }
    else if(weather == 2) {
        w1 = 'summer'
    }
    else if(weather == 3) {
        w1 = 'autumn'
    }
    else if(weather == 4) {
        w1 = 'winter'
    }
    io.sockets.emit('weather', w1)
}
setInterval(weather, 5000);






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


io.on('connection', function (socket) {
    createObject();
});