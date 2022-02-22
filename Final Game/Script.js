var socket = io();

var side = 30;


function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

function fillr() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x]
            if (obj == 1) {
                fill("green");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 3) {
                fill("red");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 4) {
                fill("black");
                rect(x * side, y * side, side, side)
            }
            else if (obj == 5) {
                fill("blue");
                rect(x * side, y * side, side, side)
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', fillr)