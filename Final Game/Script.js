var socket = io();

var side = 25;

function changer(){
    if(weather1 == "winter"){
        document.getElementById("wstyle").style.color = "#8d05e8";
    }
    else{
        document.getElementById("wstyle").style.color = "white";
    }
}


function setup() {
    createCanvas(50 * side, 50 * side);
    background('#acacac')
    // if (weath == 'summer') {
    //     background('red');
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