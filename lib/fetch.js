'use strict';

// MODULES //

var debug = require( 'debug' )( 'repo-docs:fetch' );
var get = require( 'github-fetch-file' );
var getKeys = require( 'object-keys' );


// FETCH //

/**
* FUNCTION: fetch( repos, next )
*	Attempts to fetch a README file from a list of repositories.
*
* @param {String[]} repos - list of repositories
* @param {Function} next - callback to invoke after fetching all files
* @returns {Void}
*/
function fetch( repos, next ) {
	debug( 'Attempting to fetch a README.md file from each repository.' );
	get( 'README.md', repos, onFetch );

	/**
	* FUNCTION: onFetch( error, results )
	*	Callback invoked upon fetching files.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} results - query results
	* @returns {Void}
	*/
	function onFetch( error, results ) {
		if ( error ) {
			debug( 'Encountered an error while attempting to fetch files from repositories: %s', error.message );
			return next( error );
		}
		debug( 'Total requests: %d', results.meta.total );
		debug( 'Number of successful requests: %d', results.meta.success );
		debug( 'Number of failed requests: %d', results.meta.failure );
		if ( results.meta.failure ) {
			debug( 'Failed requests: %s', getKeys( results.failures ).join( ',' ) );
		}
		next( null, results.data );
	} // end FUNCTION onFetch()
} // end FUNCTION fetch()


// EXPORTS //

module.exports = fetch;