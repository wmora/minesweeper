"use strict";

var should = require("should");
var collectionUtils = require("../collection_utils.js");

describe("Collection utillity method", function() {
	describe("listToGrid", function() {
		it("should convert a list to a two-dimensional array", function(done) {
			var aList = [1, 2, 3, 4];
			var expectedGrid = [[1, 2], [3, 4]];
			var actualGrid = collectionUtils.listToGrid(aList, 2, 2);
			actualGrid.should.deepEqual(expectedGrid);
			done();
		});
		it("should create a grid with the specified width and height", function(done) {
			var aList = [1, 2, 3, 4];
			var grid = collectionUtils.listToGrid(aList, 1, 2);
			grid.length.should.equal(2);
			grid[0].length.should.equal(1);
			done();
		});
	});
});