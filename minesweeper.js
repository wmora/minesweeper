"use strict";

var _ = require("underscore");
var collectionUtils = require("./collection_utils.js");

var createGame = function(width, height, mines) {
	validateWidth(width);
	validateHeight(height);	
	validateMines(mines, width, height);

	return createGrid(width, height, mines);
}

function validateWidth(width) {
	const MIN_WIDTH = 8;
	const MAX_WIDTH = 30;

	if (typeof width === "undefined" || width < MIN_WIDTH || width > MAX_WIDTH) {
		throw new RangeError(`width must be between ${MIN_WIDTH} and ${MAX_WIDTH}`);
	}
}

function validateHeight(height) {
	const MIN_HEIGHT = 8;
	const MAX_HEIGHT = 24;

	if (typeof height === "undefined" || height < MIN_HEIGHT || height > MAX_HEIGHT) {
		throw new RangeError(`height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT}`);
	}
}

function validateMines(mines, width, height) {	
	const MIN_MINES = 1;
	const MAX_MINES = (width - 1) * (height - 1);

	if (typeof mines === "undefined" || mines < MIN_MINES || mines > MAX_MINES) {
		throw new RangeError(`mines must be between ${MIN_MINES} and ${MAX_MINES}`);
	}
}

function createGrid(width, height, mines) {
	var squares = createSquaresList(width, height, mines);

	var grid = collectionUtils.listToGrid(squares, width, height);

	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			var square = grid[i][j];
			if (typeof square === "undefined") {
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

				_.each(squaresToCheckForMines, function(it) { if (typeof it !== "undefined" && it.mined === true) { minesAround++;} }); 
				
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

	squares = _.shuffle(squares);

	return squares;
}

exports.createGame = createGame;