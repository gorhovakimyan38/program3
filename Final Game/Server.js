var express = require("./express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
const { userInfo } = require("os");

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.redirect('index.html')
});

server.listen(2999, () => {
    console.log('connected');
})



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

let side = 20;

let matrix = generator(30, 35, 25, 20, 15, 10);
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let cactusArr = []
let humanArr = []

Grass = require('./Grass')
GrassEater = require('./GrassEater')
Predator = require('./Predator')
Cactus = require('./Cactus')
Human = require('./Human')

io.sockets.emit('send matrix', matrix)

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }
            if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            }
            if (matrix[y][x] == 4) {
                let gr = new Cactus(x, y)
                cactusArr.push(gr)
            }
            if (matrix[y][x] == 5) {
                let gr = new Human(x, y)
                humanArr.push(gr)
            }
        }
    }
}
io.sockets.emit('sendObject',createObject)


function game () {
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
        cactusArr[i].kill()
    }
    for (let i in humanArr) {
        humanArr[i].kill()
    }
}
setInterval(game,1000)
io.sockets.emit('sendgame',game)


io.on('connection', function () {
    createObject(matrix)
})