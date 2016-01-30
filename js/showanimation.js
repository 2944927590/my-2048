
function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css({
        "background-color": getNumberBackgroundColor( randNumber ),
        "color": getNumberColor( randNumber )
    }).text( privateBoard[randNumber]).animate({
        "width": cellSideLength,
        "height": cellSideLength,
        "top": getPosTop( i, j ),
        "left": getPosLeft( i, j )
    },20);
    setBoardToLocal( boardLocalName , board );
}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        "top": getPosTop(tox, toy),
        "left": getPosLeft(tox, toy)
    }, 200);
    setBoardToLocal( boardLocalName , board );
}

function updateScore( score ){

    setScoreToLocal(score);

    $("#score").stop().animate({
        'font-size': '40px'
    },30,function(){
        $(this).animate({
            'font-size': '25px'
        },60);
    }).text(score);
}

function setScoreToLocal(score){
    if(board.length > 4){
        board.pop();
        board.push(score);
    } else {
        board.push(score);
    }
    if( noapace() ){
        setBoardToLocal( boardLocalName , board);
    }
}