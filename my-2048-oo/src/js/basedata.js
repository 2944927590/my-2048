//移动适配
let documentWidth = window.screen.availWidth; //屏幕可用宽度
let gridContainerWidth = 0.92 * documentWidth; //主体宽度
let cellSideLength = 0.18 * documentWidth; //每个格子的宽度
let cellSpace = 0.04 * documentWidth; //间隔

(documentWidth > 500) && (gridContainerWidth = 500, cellSpace = 20, cellSideLength = 100);

let getNumberBackgroundColor = function(number){
    switch (number){
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

let getNumberColor = function(number) {
    if(number <= 4)
        return "#776e65";
    return "white";
}

let getPosTop = function ( i, j ){
    return cellSpace + i * (cellSideLength + cellSpace);
}

let getPosLeft = function ( i, j ){
    return cellSpace + j * (cellSideLength + cellSpace);
}

export default  {
    documentWidth: documentWidth,
    gridContainerWidth: gridContainerWidth,
    cellSideLength: cellSideLength,
    cellSpace: cellSpace,
    getNumberBackgroundColor: getNumberBackgroundColor,
    getNumberColor: getNumberColor,
    getPosTop: getPosTop,
    getPosLeft: getPosLeft
};