"use strict";

var should = require('should');
var minesweeper = require('../minesweeper.js');

describe('Minesweeper', function() {
	describe('grid', function() {
		describe('width', function() {
			it('has a maximum of 30 squares', function(done) {
				should(minesweeper.createGame.bind(null, 31, 8, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 30, 8, 1)).not.throw();
				done();

			});
			it('has a minimum of 8 squares', function(done) {
				should(minesweeper.createGame.bind(null, 7, 8, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 1)).not.throw();
				done();
			});		
			it('cannot be undefined', function(done) {
				should(minesweeper.createGame.bind(null, null, 8, 1)).throw(/^width/);
				done();
			});
		});
		
		describe('height', function() {
			it('has a maximum of 24 squares vertically', function(done) {
				should(minesweeper.createGame.bind(null, 30, 25, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 30, 24, 1)).not.throw();
				done();
			});
			
			it('has a minimum of 8 squares vertically', function(done) {
				should(minesweeper.createGame.bind(null, 9, 7, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 1)).not.throw();
				done();
			});
			it('cannot be undefined', function(done) {
				should(minesweeper.createGame.bind(null, 8, null, 1)).throw(/^height/);
				done();
			});
		});
		
	});
});