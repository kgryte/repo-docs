'use strict';

// MODULES //

var debug = require( 'debug' )( 'repo-docs:init' );


// INIT //

/**
* FUNCTION: init( repos )
*	Returns a function which initializes a waterfall.
*
* @param {String[]} repos - list of repositories
* @returns {Function} function which initializes a waterfall
*/
function init( repos ) {
	/**
	* FUNCTION: init( next )
	*	Initializes a waterfall.
	*
	* @param {Function} next - callback to invoke after completing initialization
	* @returns {Void}
	*/
	return function init( next ) {
		debug( 'Number of repos: %d', repos.length );
		debug( 'Repository list: %s', repos.join( ',' ) );
		next( null, repos );
	}; // end FUNCTION init()
} // end FUNCTION init()


// EXPORTS //

module.exports = init;