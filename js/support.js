
//移动适配
documentWidth = window.screen.availWidth; //屏幕可用宽度
gridContainerWidth = 0.92 * documentWidth; //主体宽度
cellSideLength = 0.18 * documentWidth; //每个格子的宽度
cellSpace = 0.04 * documentWidth; //间隔

function getPosTop( i, j ){
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft( i, j ){
    return cellSpace + j * (cellSideLength + cellSpace);
}

function getNumberBackgroundColor( number ) {
    switch ( number ) {
        case 2: return "#99CC99";break;
        case 4: return "#ede0c8";break;
        case 8: return "#f2b179";break;
        case 16: return "#f59563";break;
        case 32: return "#f65e3b";break;
        case 64: return "#edef72";break;
        case 128: return "#FF6666";break;
        case 256: return "#99CC00";break;
        case 512: return "#eee4da";break;
        case 1024: return "#FFFF00";break;
        case 2048: return "#FFFF66";break;
    }
    return "#000";
}

function getNumberColor( number ) {
    if(number <= 4)
        return "#776e65";
    return "white";
}

function noapace(){
    for( var i = 0; i < 4; i++ )
        for( var j = 0; j < 4; j++ )
            if( board[i][j] == 0 )
                return false;
    return true;
}

function canMoveLeft( board){
    for( var i = 0; i < 4; i++)
        for( var j = 1; j < 4; j++)
            if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                return true;
    return false;
}

function canMoveTop( board ){
    for(var i = 1; i < 4; i++ )
        for(var j = 0; j < 4; j++)
            if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                return true;
    return false;
}

function canMoveRight( board ){
    for(var i = 0; i < 4; i++ )
        for(var j = 0; j < 3; j++)
            if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                return true;
    return false;
}

function canMoveDown( board ){
    for(var i = 0; i < 3; i++ )
        for(var j = 0; j < 4; j++)
            if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                return true;
    return false;
}

function noBlockHorizontal( row, col1, col2, board){
    for (var i = col1 + 1; i < col2; i++)
        if( board[row][i] != 0 )
            return false;
    return true;
}

function noBlockVertical( col, row1, row2, board){
    for (var i = row1 + 1; i < row2; i++)
        if( board[i][col] != 0 )
            return false;
    return true;
}

function nomove(){
    if( canMoveLeft(board) || canMoveTop(board) ||
        canMoveRight( board ) || canMoveDown( board ))
        return false;
    return true;
}