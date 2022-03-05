// Chart.js   search Google ----------------------

var socket = io();

var side = 25;

socket.on("weather", function (data) {
    weath = data;
})


function setup() {
    createCanvas(50 * side, 50 * side);
    background('acacac')
    // if (weath == 0) {
    //     background('white');
    // }

    // if (weath == 'spring') {
    //     background('green');
    // }

    // if (weath == 'autumn') {
    //     background('yellow');
    // }
    // if (weath == 'winter') {
    //     background('white');
    // }
    var grass_stat = document.getElementById("grass_stat");
    var grassEater_stat = document.getElementById("grassEater_stat");
    var predator_stat = document.getElementById("predator_stat");
    var cactus_stat = document.getElementById("cactus_stat");
    var human_stat = document.getElementById("human_stat");
    socket.on('send state', function (count) {
        grass_stat.innerText = "Grass(ligth green) " + count.grass
        grassEater_stat.innerText = "GrassEater(yellow) " + count.grassEater
        predator_stat.innerText = "Predator(red) " + count.predator
        cactus_stat.innerText = "Cactus(green) " + count.cactus
        human_stat.innerText = "Human(ligth yellow) " + count.human
    })
}

function fillr(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x]
            if (obj == 1) {

                // if (weath == 'spring') {
                //     fill("#37D636");
                //     rect(x * side, y * side, side, side)
                // }

                // if (weath == 'summer') {
                //     fill("#66AB1D");
                //     rect(x * side, y * side, side, side)
                // }

                // if (weath == 'autumn') {
                //     if (grassArr >= 7)
                //         grassArr-=7
                //     fill("#B3CA24");
                //     rect(x * side, y * side, side, side)
                // }

                // if (weath == 'winter') {
                //     grassArr == 0
                // }
                fill('#66AB1D')
                rect(x * side, y * side, side, side)
            }
            else if (obj == 2) {
                fill("#FFF565");
                rect(x * side, y * side, side, side)
            }

            else if (obj == 3) {
                fill("#551111");
                rect(x * side, y * side, side, side)
            }

            else if (obj == 4) {
                fill("#144B19");
                rect(x * side, y * side, side, side)
            }

            else if (obj == 5) {
                fill("#E8D38B");
                rect(x * side, y * side, side, side)
            }
        }
    }
}

socket.on('send matrix', fillr)