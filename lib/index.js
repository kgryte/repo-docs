'use strict';

// MODULES //

var debug = require( 'debug' )( 'repo-docs:main' );
var waterfall = require( 'utils-series-waterfall' );
var init = require( './init.js' );
var fetch = require( './fetch.js' );
var md2rst = require( './md2rst.js' );
var createTimer = require( './timer.js' );


// RUN //

/**
* FUNCTION: run( repos, opts, clbk )
*	
*
* @returns {Void}
*/
function run( repos, opts, clbk ) {
	var timer;
	var fcns;

	fcns = [
		init( repos ),
		fetch,
		md2rst
	];

	timer = createTimer();
	debug( 'Start time: %s', timer.toString() );

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
		if ( error ) {
			return clbk( error );
		}
		debug( 'Total elapsed time: %d seconds', timer.stop() );

		clbk();
	} // end FUNCTION done()
} // end FUNCTION run()


// EXPORTS //

module.exports = run;
