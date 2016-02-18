'use strict';

// TIMER //

/**
* FUNCTION: Timer()
*	Timer constructor.
*
* @constructor
* @returns {Timer} Timer instance
*/
function Timer() {
	if ( !(this instanceof Timer) ) {
		return new Timer();
	}
	this._start = process.hrtime();
	this._ts = this._start[0]/1000 + this._start[1]*1e-6; // milliseconds

	return this;
} // end FUNCTION Timer()

/**
* METHOD: stop()
*	Stops a timer.
*
* @returns {Number} elapsed seconds
*/
Timer.prototype.stop = function stop() {
	var delta = process.hrtime( this._start );
	return delta[0] + delta[1]*1e-9;
}; // end METHOD stop()

/**
* METHOD: toString()
*	Returns a string representation of a timer instance.
*
* @returns {String} string representation
*/
Timer.prototype.toString = function toString() {
	return (new Date( this._ts )).toISOString();
}; // end METHOD toString()


// EXPORTS //

module.exports = Timer;
