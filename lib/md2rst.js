'use strict';

// MODULES //

var debug = require( 'debug' )( 'repo-docs:md2rst' );
var getKeys = require( 'object-keys' );
var md2rst = require( 'markdown-to-restructuredtext' );


// VARIABLES //

var MAX_CONCURRENT = 10;
var OPTS = { 'flavor': 'github' };


// CONVERT //

/**
* FUNCTION: convert( data, clbk )
*	Converts Markdown data to reStructuredText.
*
* @param {Object} data - Markdown data
* @param {Function} clbk - callback to invoke after completing conversion
* @returns {Void}
*/
function convert( data, clbk ) {
	var count;
	var keys;
	var rst;
	var idx;
	var len;
	var i;
	
	keys = getKeys( data );
	len = keys.length;

	count = 0;

	rst = {};
	idx = 0;
	for ( i = 0; i < MAX_CONCURRENT; i++ ) {
		next();
	}

	/**
	* FUNCTION: next()
	*	Converts the next Markdown data in the queue. If all conversions are complete, invokes the provided callback.
	*
	* @private
	* @return {Void}
	*/
	function next() {
		var repo;
		if ( count === len ) {
			debug( 'Finished all conversions.' );
			return clbk( null, data, rst );
		}
		if ( idx < len ) {
			repo = keys[ idx ];
			debug( 'Converting Markdown data for repo `%s` (%d).', repo, idx );

			md2rst.fromString( data[ repo ], OPTS, onResults( repo, idx ) );
			idx += 1;
		}
	} // end FUNCTION next()

	/**
	* FUNCTION: onResults( repo, idx )
	*	Returns a callback.
	*
	* @private
	* @param {String} repo - repository name
	* @param {Number} idx - conversion index
	* @returns {Function} callback
	*/
	function onResults( repo, idx ) {
		/**
		* FUNCTION: onResults( error, results )
		*	Callback invoked upon completing a conversion.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {String} results - conversion results
		* @returns {Void}
		*/
		return function onResults( error, results ) {
			if ( error ) {
				debug( 'Encountered an error while converting Markdown for repo `%s` (%d): %s', repo, idx, error.message );
				return clbk( error );
			}
			debug( 'Successfully converted Markdown for repo `%s` (%d).', repo, idx );
			rst[ repo ] = results;

			count += 1;
			debug( 'Conversion %d of %d complete.', count, len );

			next();
		}; // end FUNCTION onResults()
	} // end FUNCTION onResults()
} // end FUNCTION convert()


// EXPORTS //

module.exports = convert;