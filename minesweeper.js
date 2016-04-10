"use strict";

var _ = require("underscore");
var collectionUtils = require("./collection_utils.js");

/**
 *	Creates a game of minesweeper
 *
 *	@param {int} width - grid width. Must be a value between 8 and 30
 *	@param {int} height - grid height. Must be a value between 8 and 24
 *	@param {int} mines - number of mines. Must be a value between 1 and (width - 1)*(height - 1)
 * 	@param {int} x - x coordinate of the first user input. This is needed to guarantee that the first move will not be a mine
 * 	@param {int} y - y coordinate of the first user input. This is needed to guarantee that the first move will not be a mine
 */
var createGame = function(width, height, mines, x, y) {
	validateWidth(width);
	validateHeight(height);	
	validateMines(mines, width, height);

	return createGrid(width, height, mines, x, y);
}

function validateWidth(width) {
	const MIN_WIDTH = 8;
	const MAX_WIDTH = 30;

	if (_.isUndefined(width) || width < MIN_WIDTH || width > MAX_WIDTH) {
		throw new RangeError(`width must be between ${MIN_WIDTH} and ${MAX_WIDTH}`);
	}
}

function validateHeight(height) {
	const MIN_HEIGHT = 8;
	const MAX_HEIGHT = 24;

	if (_.isUndefined(height)|| height < MIN_HEIGHT || height > MAX_HEIGHT) {
		throw new RangeError(`height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT}`);
	}
}

function validateMines(mines, width, height) {	
	const MIN_MINES = 1;
	const MAX_MINES = (width - 1) * (height - 1);

	if (_.isUndefined(mines) || mines < MIN_MINES || mines > MAX_MINES) {
		throw new RangeError(`mines must be between ${MIN_MINES} and ${MAX_MINES}`);
	}
}

function createGrid(width, height, mines, x, y) {	
	var grid;
	
	do {
		var squares = createSquaresList(width, height, mines);
		grid = collectionUtils.listToGrid(squares, width, height);
	} while (!_.isUndefined(grid[x][y]) && grid[x][y].mined === true);

	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			var square = grid[i][j];
			if (_.isUndefined(square)) {
				var minesAround = 0;
				var squaresToCheckForMines = [];
				
				if (i > 0) {
					squaresToCheckForMines.push(grid[i - 1][j]);
					if (j > 0) {
						squaresToCheckForMines.push(grid[i - 1][j - 1]);
					}
					if (j < grid[i].length - 1) {
						squaresToCheckForMines.push(grid[i - 1][j + 1]);
					}
				}

				if (j > 0) {
					squaresToCheckForMines.push(grid[i][j - 1]);
				}

				if (j < grid[i].length - 1) {
					squaresToCheckForMines.push(grid[i][j + 1]);
				}

				if (i < grid.length - 1) {
					squaresToCheckForMines.push(grid[i + 1][j]);
					if (j > 0) {
						squaresToCheckForMines.push(grid[i + 1][j - 1]);
					}
					if (j < grid[i].length - 1) {
						squaresToCheckForMines.push(grid[i + 1][j + 1]);
					}
				}

				_.each(squaresToCheckForMines, function(it) { if (!_.isUndefined(it) && it.mined === true) { minesAround++;} }); 

				grid[i][j] = { mined: false, mines_around: minesAround};
			}
		}
	}

	return grid;
}

function createSquaresList(width, height, mines) {
	var squares = new Array(width * height);
	
	for (var i = 0; i < mines; i++) {
		squares[i] = { mined: true };
	}

	return _.shuffle(squares);
}

exports.createGame = createGame;