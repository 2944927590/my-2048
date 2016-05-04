import $ from 'jquery';
import data from './data';
import baseData from './basedata';

let noapace = function(){
    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4; j++ )
            if( data.board[i][j] == 0 )
                return false;
    return true;
}

let generateOneNumber = function() {
    if( noapace())
        return false;
    //位置
    var randx = parseInt( Math.floor( Math.random() * 4 ) );
    var randy = parseInt( Math.floor( Math.random() * 4 ) );

    var times = 0;
    while( times < 100 ) {
        if(data.board[randx][randy] == 0)
            break;
        var randx = parseInt( Math.floor( Math.random() * 4 ) );
        var randy = parseInt( Math.floor( Math.random() * 4 ) );

        times++;
    }
    if(times == 100) {
        for( var i = 0; i < 4; i++ ){
            for( var j = 0; j < 4; j++){
                if(data.board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //随机生成一个数字（ 2/4 ）
    var randNumber = Math.random() < 0.5 ? 2 : 4 ;

    data.board[randx][randy] = randNumber;

    showNumberWithAnimation( randx, randy, randNumber);

    return true;
}

let showNumberWithAnimation = function(i, j, randNumber) {
    let numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css({
        "background-color": baseData.getNumberBackgroundColor( randNumber ),
        "color": baseData.getNumberColor( randNumber )
    }).text( data.privateBoard[randNumber]).animate({
        "width": baseData.cellSideLength,
        "height": baseData.cellSideLength,
        "top": baseData.getPosTop( i, j ),
        "left": baseData.getPosLeft( i, j )
    },20);
}

let showMoveAnimation = function(fromx, fromy, tox, toy){
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        "top": baseData.getPosTop(tox, toy),
        "left": baseData.getPosLeft(tox, toy)
    }, 200);
}

let canMoveLeft = function( board){
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++)
            if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                return true;
    return false;
}

let noBlockHorizontal = function ( row, col1, col2, board){
    for (var i = col1 + 1; i < col2; i++)
        if( board[row][i] != 0 )
            return false;
    return true;
}

let canMoveTop = function( board ){
    for(var i = 1; i < 4; i++ )
        for(var j = 0; j < 4; j++)
            if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                return true;
    return false;
}

let canMoveRight = function( board ){
    for(var i = 0; i < 4; i++ )
        for(var j = 0; j < 3; j++)
            if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                return true;
    return false;
}

let canMoveDown = function( board ){
    for(var i = 0; i < 3; i++ )
        for(var j = 0; j < 4; j++)
            if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                return true;
    return false;
}

let noBlockVertical = function( col, row1, row2, board){
    for (var i = row1 + 1; i < row2; i++)
        if( board[i][col] != 0 )
            return false;
    return true;
}

let nomove = function(){
    if( canMoveLeft(data.board) || canMoveTop(data.board) ||
        canMoveRight( data.board ) || canMoveDown( data.board ))
        return false;
    return true;
}


let moveLeft = function(){
    if( !canMoveLeft( data.board ) )
        return false;
    //moveLeft
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++){
            if( data.board[i][j] != 0){
                for( var k = 0; k < j; k++){
                    if(data.board[i][k] == 0 && noBlockHorizontal( i, k, j, data.board )){

                        showMoveAnimation(i, j, i, k);
                        data.board[i][k] = data.board[i][j];
                        data.board[i][j] = 0;
                        continue;
                    } else if (data.board[i][k] == data.board[i][j] && noBlockHorizontal( i, k, j, data.board ) && !data.hasConflicted[i][k]){

                        showMoveAnimation(i, j, i, k);

                        data.board[i][k] += data.board[i][j];
                        data.board[i][j] = 0;

                        //score += data.board[i][k];
                        //updateScore(score);

                        data.hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    return true;
}

let moveRight = function(){
    if( !canMoveRight( data.board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( data.board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( data.board[i][k] == 0 && noBlockHorizontal( i , j , k , data.board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        data.board[i][k] = data.board[i][j];
                        data.board[i][j] = 0;
                        continue;
                    }
                    else if( data.board[i][k] == data.board[i][j] && noBlockHorizontal( i , j , k , data.board )  && !data.hasConflicted[i][k]){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        data.board[i][k] += data.board[i][j];
                        data.board[i][j] = 0;

                        //score += board[i][k];
                        //updateScore(score);
                        continue;
                    }
                }
            }
        }

    //setTimeout("updateBoardView()",200);
    return true;
}

let moveTop = function(){

    if( !canMoveTop( data.board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( data.board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( data.board[k][j] == 0 && noBlockVertical( j , k , i , data.board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        data.board[k][j] = data.board[i][j];
                        data.board[i][j] = 0;
                        continue;
                    }
                    else if( data.board[k][j] == data.board[i][j] && noBlockVertical( j , k , i , data.board ) && !data.hasConflicted[k][j]){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        data.board[k][j] += data.board[i][j];
                        data.board[i][j] = 0;

                        //score += board[k][j];
                        //updateScore(score);
                        continue;
                    }
                }
            }
        }

    //setTimeout("updateBoardView()",200);
    return true;
}

let moveDown = function (){
    if( !canMoveDown( data.board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( data.board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( data.board[k][j] == 0 && noBlockVertical( j , i , k , data.board ) && !data.hasConflicted[k][j]){
                        //move
                        showMoveAnimation( i , j , k , j );
                        data.board[k][j] = data.board[i][j];
                        data.board[i][j] = 0;
                        continue;
                    }
                    else if( data.board[k][j] == data.board[i][j] && noBlockVertical( j , i , k , data.board )   ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        data.board[k][j] += data.board[i][j];
                        data.board[i][j] = 0;

                        //score += board[k][j];
                       // updateScore(score);
                        continue;
                    }
                }
            }
        }
    //setTimeout("updateBoardView()",200);
    return true;
}

let gameover = function(){
    alert("Game Over!");
}

let isgameover = function(){
    if( noapace( data.board ) && nomove( data.board)){
        gameover();
    }
}
let generateIsGameover = function(){
    //setTimeout("generateOneNumber()", 210);
    //setTimeout("isgameover()", 300);
    generateOneNumber();
    isgameover();
}

export default {
    generateOneNumber: generateOneNumber,
    moveLeft: moveLeft,
    moveRight: moveRight,
    moveTop: moveTop,
    moveDown: moveDown,
    generateIsGameover: generateIsGameover
};



