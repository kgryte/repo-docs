'use strict';

var run = require( './../lib' );

var repos = [
	'kgryte/utils-copy',
	'kgryte/utils-merge',
	'kgryte/utils-pluck',
	'kgryte/utils-deep-pluck',
	'kgryte/utils-deep-get',
	'kgryte/utils-deep-set'
];

var opts = {
	'dir': './build/manual'
};

run( repos, opts, clbk );

function clbk( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'done' );
}