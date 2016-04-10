"use strict";

var should = require('should');
var minesweeper = require('../minesweeper.js');

describe('Minesweeper', function() {
	describe('grid', function() {
		describe('width', function() {
			it('has a maximum of 30 squares', function(done) {
				should(minesweeper.createGame.bind(null, 31, 8, 1, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 30, 8, 1, 1, 1)).not.throw();
				done();

			});
			it('has a minimum of 8 squares', function(done) {
				should(minesweeper.createGame.bind(null, 7, 8, 1, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 1, 1, 1)).not.throw();
				done();
			});		
			it('cannot be undefined', function(done) {
				should(minesweeper.createGame.bind(null, null, 8, 1, 1, 1)).throw(/^width/);
				done();
			});
		});
		
		describe('height', function() {
			it('has a maximum of 24 squares', function(done) {
				should(minesweeper.createGame.bind(null, 30, 25, 1, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 30, 24, 1, 1, 1)).not.throw();
				done();
			});
			
			it('has a minimum of 8 squares', function(done) {
				should(minesweeper.createGame.bind(null, 9, 7, 1, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 1, 1, 1)).not.throw();
				done();
			});
			it('cannot be undefined', function(done) {
				should(minesweeper.createGame.bind(null, 8, null, 1, 1, 1)).throw(/^height/);
				done();
			});
		});


		describe('mines', function() {
			it('must be at least 1', function(done) {
				should(minesweeper.createGame.bind(null, 8, 8, 0, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 1, 1, 1)).not.throw();
				done();
			});
			it('must be at most (width-1)(height-1)', function(done) {
				// An 8x8 grid can have a maximum of 49 (7*7)
				should(minesweeper.createGame.bind(null, 8, 8, 50, 1, 1)).throw(RangeError);
				should(minesweeper.createGame.bind(null, 8, 8, 49, 1, 1)).not.throw();
				done();
			});
			it('cannot be undefined', function(done) {
				should(minesweeper.createGame.bind(null, 8, 8, null, 1, 1)).throw(/^mines/);
				done();
			});
		});
		
	});
});