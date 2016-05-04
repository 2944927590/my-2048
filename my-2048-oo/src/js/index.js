import baseCss from '../css/base';
import mainCss from '../css/main';

import $ from 'jquery';

import baseData from './basedata';
import data from './data';
import action from './action';

let container, gridCell, numCell;

function NumberCell(){
    this._container = new Container();
    this._numCell = null;

    this.show = function(){
        $(".number-cell").remove();
        for( var i = 0; i < 4; i ++){
            for( var j = 0; j < 4; j++){
                this._container.getContainer().append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
                this._numCell = $("#number-cell-"+i+"-"+j);
                if( data.board[i][j] == 0 ){
                    this._numCell.css({
                        "width": "0px",
                        "height": "0px",
                        "top": baseData.getPosTop(i, j) + baseData.cellSideLength / 2,
                        "left": baseData.getPosLeft(i, j)+ baseData.cellSideLength / 2
                    });
                } else {
                    this._numCell.css({
                        "width": baseData.cellSideLength,
                        "height": baseData.cellSideLength,
                        "top": baseData.getPosTop(i, j),
                        "left": baseData.getPosLeft(i, j),
                        "background-color": baseData.getNumberBackgroundColor( parseInt( data.board[i][j]) ),
                        "color": baseData.getNumberColor( data.board[i][j] )
                    }).text( data.privateBoard[data.board[i][j]] );
                }
                data.hasConflicted[i][j] = false;
            }
        }
        $(".number-cell").css({
            "line-height": baseData.cellSideLength + "px",
            "font-size": 0.3 * baseData.cellSideLength + "px"
        });
    }
}

function GridCell(){
    this._container = null;
    this._gridCell = null;
    this.show = function(){
        this._container = new Container();
        this._container.getContainer().find(".grid-cell").css({
            "width": baseData.cellSideLength,
            "height": baseData.cellSideLength
        });
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++){
                this._gridCell = $('#grid-cell-' + i + "-" + j);
                this._gridCell.css({
                    'top': baseData.getPosTop(i, j),
                    'left': baseData.getPosLeft(i, j)
                });
            }
        }
    }
}

function Container(){
    this._container = $("#grid-container");
    this.show = function(){
        this._container.css({
            "width": baseData.gridContainerWidth - 2 * baseData.cellSpace,
            "height": baseData.gridContainerWidth - 2 * baseData.cellSpace,
            "padding": baseData.cellSpace
        });
    }
    this.getContainer = function(){
        return this._container;
    }
}

let init = function(){
    action.generateOneNumber();
    action.generateOneNumber();

    container = new Container();
    gridCell = new GridCell();
    numCell = new NumberCell();

    container.show();
    gridCell.show();
    numCell.show();

    $(document).keydown( function(event) {
        switch (event.keyCode) {
            case 37: //left
                event.preventDefault();
                if( action.moveLeft() ){
                    numCell.show();
                    action.generateIsGameover();
                }
                break;
            case 38: //top
                event.preventDefault();
                if( action.moveTop() ){
                    numCell.show();
                    action.generateIsGameover();
                }
                break;
            case 39: //right
                event.preventDefault();
                if( action.moveRight() ){
                    numCell.show();
                    action.generateIsGameover();
                }
                break;
            case 40: //down
                event.preventDefault();
                if( action.moveDown() ){
                    numCell.show();
                    action.generateIsGameover();
                }
                break;
            default:
                break;
        }
    });
}

window.onload = function(){
    init();
}
