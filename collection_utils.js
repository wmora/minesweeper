"use strict";

/**
 *	Converts a given list to a two-dimensional array. The length of the list should be at least width * height
 *
 *	@param {Array} list - list to be converted
 *  @param {int} width - desired width
 *  @param {int} height - desired height
 */
var listToGrid = function(list, width, height) {
	var grid = new Array(height);
	
	for (var i = 0; i < height; i++) {
		
		grid[i] = new Array(width);
		
		for (var j = 0; j < width; j++) {
			grid[i][j] = list[(i * width) + j];
		}
	}

	return grid;
}

exports.listToGrid = listToGrid;