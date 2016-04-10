"use strict";

var createGame = function(width, height, mines) {
	validateWidth(width);
	validateHeight(height);	
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

exports.createGame = createGame;