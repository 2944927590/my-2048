let board = [],
    hasConflicted = [];

//私人订制
let privateBoard = {
    2: "2",
    4: "4",
    8: "8",
    16: "16",
    32: "32",
    64: "64",
    128: "128",
    256: "256",
    512: "512",
    1024: "1024",
    2048: "2048"
}

let init = function(){
    for( var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
}
init();
export default {
    init: init,
    board: board,
    hasConflicted: hasConflicted,
    privateBoard: privateBoard
}

