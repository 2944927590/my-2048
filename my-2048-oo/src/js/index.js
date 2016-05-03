import baseCss from '../css/base';
import mainCss from '../css/main';

import $ from 'jquery';

let container, gridCell;

//移动适配
let documentWidth = window.screen.availWidth; //屏幕可用宽度
let gridContainerWidth = 0.92 * documentWidth; //主体宽度
let cellSideLength = 0.18 * documentWidth; //每个格子的宽度
let cellSpace = 0.04 * documentWidth; //间隔

function GridCell(){
    this._container = null;
    this._gridCell = null;
    this.show = function(){
        this._container = new Container();
        this._container.getContainer().find(".grid-cell").css({
            "width": cellSideLength,
            "height": cellSideLength
        });
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++){
                this._gridCell = $('#grid-cell-' + i + "-" + j);
                this._gridCell.css({
                    'top': this.getPosTop(i, j),
                    'left': this.getPosLeft(i, j)
                });
            }
        }
    }
    this.getPosTop = function ( i, j ){
        return cellSpace + i * (cellSideLength + cellSpace);
    }
    this.getPosLeft = function ( i, j ){
        return cellSpace + j * (cellSideLength + cellSpace);
    }
}

function Container(){
    this._container = $("#grid-container");
    this.show = function(){
        (documentWidth > 500) && (gridContainerWidth = 500, cellSpace = 20, cellSideLength = 100);
        this._container.css({
            "width": gridContainerWidth - 2 * cellSpace,
            "height": gridContainerWidth - 2 * cellSpace,
            "padding": cellSpace
        });
    }
    this.getContainer = function(){
        return this._container;
    }
}

window.onload = function(){
    container = new Container();
    container.show();

    gridCell = new GridCell();
    gridCell.show();
}

