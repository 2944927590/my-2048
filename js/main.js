var boardLocalName = "my-2048";
var board = getBoardFromLocal( boardLocalName ) || new Array(); //存放数据的一个二维数组
var score =  0;
//console.log(board);


function stringCutByNum(arr, num){
    var arr1 = new Array();
    var arr2 = new Array();
    for(var i = 0; i < arr.length; i++){
        arr1.push( parseInt( arr[i] ) );
        if( (i+1) % num == 0 ){
            arr2.push(arr1);
            arr1 = new Array();
        }
    }
    score = parseInt(  arr[i-1] );
    return arr2;
}
//console.log(board);
//console.log(score);
var hasConflicted = new Array(); //记录是否发生合并的位置

//触控坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

//私人订制
var privateBoard = {
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

function newgame(){
    //console.log(typeof  board);
    //console.log(board);
    updateBoard();
    if( "object" == typeof board && board.length == 0 ){
        init();
        generateOneNumber();
        generateOneNumber();
    } else {
        initLocal();
    }
}

function privategame() {
    //
    alert("... ...");
}

function updateBoard(){
    board = getBoardFromLocal( boardLocalName ) || new Array();
    if( "string" == typeof board && board.length > 0){
        //console.log(board.split(','));
        board = stringCutByNum(board.split(','), 4);
        //console.log(board);
    }
}

function setBoardToLocal( name, board ){
    localStorage.setItem(name, board);
}

function getBoardFromLocal( name ){
    return localStorage.getItem( name) || false;
}
function removeBoardFromLocal( name ){
    localStorage.removeItem( name );
}
function prepareForMobile(){
    if(documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    var grid_container = $("#grid-container");
    grid_container.css({
        "width": gridContainerWidth - 2 * cellSpace,
        "height": gridContainerWidth - 2 * cellSpace,
        "padding": cellSpace
    });
    grid_container.find(".grid-cell").css({
        "width": cellSideLength,
        "height": cellSideLength
    });
    $(".header").css({
        "width": gridContainerWidth
    });
}
function init(){
    for( var i = 0; i < 4; i ++ ) {
        for( var j = 0; j < 4; j ++ ) {
            var gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }
    }
    for( var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    updateScore(score);
}

function initLocal() {
    for( var i = 0; i < 4; i ++ ) {
        for( var j = 0; j < 4; j ++ ) {
            var gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }
    }
    for( var i = 0; i < 4; i++) {
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; j++){
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    updateScore(score);
}

function updateBoardView(){
    $(".number-cell").remove();
    for( var i = 0; i < 4; i ++){
        for( var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            if( board[i][j] == 0 ){
                theNumberCell.css({
                    "width": "0px",
                    "height": "0px",
                    "top": getPosTop(i, j) + cellSideLength / 2,
                    "left": getPosLeft(i, j)+ cellSideLength / 2
                });
            } else {
                theNumberCell.css({
                    "width": cellSideLength,
                    "height": cellSideLength,
                    "top": getPosTop(i, j),
                    "left": getPosLeft(i, j),
                    "background-color": getNumberBackgroundColor( parseInt( board[i][j]) ),
                    "color": getNumberColor( board[i][j] )
                }).text( privateBoard[board[i][j]] );
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css({
        "line-height": cellSideLength + "px",
        "font-size": 0.3 * cellSideLength + "px"
    });
}
function generateOneNumber() {
    if( noapace())
        return false;
    //位置
    var randx = parseInt( Math.floor( Math.random() * 4 ) );
    var randy = parseInt( Math.floor( Math.random() * 4 ) );

    var times = 0;
    while( times < 100 ) {
        if(board[randx][randy] == 0)
            break;
        var randx = parseInt( Math.floor( Math.random() * 4 ) );
        var randy = parseInt( Math.floor( Math.random() * 4 ) );

        times++;
    }
    if(times == 100) {
        for( var i = 0; i < 4; i++ ){
            for( var j = 0; j < 4; j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //随机生成一个数字（ 2/4 ）
    var randNumber = Math.random() < 0.5 ? 2 : 4 ;

    board[randx][randy] = randNumber;

    showNumberWithAnimation( randx, randy, randNumber);

    return true;
}

function generateIsGameover(){

    setTimeout("generateOneNumber()",210);
    setTimeout("isgameover()",300);

}

$(document).keydown( function(event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if( moveLeft() ){
                generateIsGameover()
            }
            break;
        case 38: //top
            event.preventDefault();
            if( moveTop() ){
                generateIsGameover()
            }
            break;
        case 39: //right
            event.preventDefault();
            if( moveRight() ){
                generateIsGameover()
            }
            break;
        case 40: //down
            event.preventDefault();
            if( moveDown() ){
                generateIsGameover()
            }
            break;
        default:
            break;
    }
});
//触控获取始，终坐标
document.addEventListener("touchstart", function(e){
    //console.log(e);
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
});

document.addEventListener("touchmove", function(e){
    e.preventDefault();
});

document.addEventListener("touchend", function(e){
    //console.log(e);
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;

    var deltax = endx - startx ;
    var deltay = endy - starty ;

    //点击和触控混乱
    if( Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth){
        return ;
    }

    //x
    if( Math.abs( deltax ) >=  Math.abs( deltay ) ){
        if( deltax > 0 ) {
            //x正方向 （右）
            if( moveRight() ){
                generateIsGameover()
            }
        } else {
            //x负方向 （左）
            if( moveLeft() ){
                generateIsGameover()
            }
        }
    } else { //y
        if( deltay > 0 ) {
            //y正方向 （下）
            if( moveDown() ){
                generateIsGameover()
            }
        } else {
            //y负方向 （上）
            if( moveTop() ){
                generateIsGameover()
            }
        }
    }


});

function isgameover(){
    if( noapace( board ) && nomove( board)){
        gameover();
    }
}

function gameover(){
    alert("Game Over!");
}

function moveLeft(){
    if( !canMoveLeft( board ) )
        return false;
    //moveLeft
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++){
            if( board[i][j] != 0){
                for( var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal( i, k, j, board )){

                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal( i, k, j, board ) && !hasConflicted[i][k]){

                        showMoveAnimation(i, j, i, k);

                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);

    return true;
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board )  && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveTop(){

    if( !canMoveTop( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board )   ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

$("#new-game").on("click", function() {
    removeBoardFromLocal( boardLocalName );
    newgame();
});

$("#private-game").on("click", function(){
    privategame()
});