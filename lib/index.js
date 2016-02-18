'use strict';

// MODULES //

var debug = require( 'debug' )( 'repo-docs:main' );
var waterfall = require( 'utils-series-waterfall' );
var init = require( './init.js' );
var fetch = require( './fetch.js' );
var md2rst = require( './md2rst.js' );


// RUN //

/**
* FUNCTION: run( repos, opts, clbk )
*	
*
* @returns {Void}
*/
function run( repos, opts, clbk ) {
	var start;
	var time;
	var fcns;

	fcns = [
		init( repos ),
		fetch,
		md2rst
	];

	start = process.hrtime();
	time = start[0]/1000 + start[1]*1e-6;
	debug( 'Start time: %s', (new Date( time )).toString() );

	waterfall( fcns, done );

	/**
	* FUNCTION: done( [error] )
	*	Callback invoked after completing tasks.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {Void}
	*/
	function done( error ) {
		var delta;
		if ( error ) {
			return clbk( error );
		}
		delta = process.hrtime( start );
		delta = delta[0] + delta[1]*1e-9;
		debug( 'Total elapsed time: %d seconds', delta );

		clbk();
	} // end FUNCTION done()
} // end FUNCTION run()


// EXPORTS //

module.exports = run;
