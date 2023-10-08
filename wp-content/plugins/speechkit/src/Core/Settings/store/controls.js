import apiFetch from '@wordpress/api-fetch';

const controls = {
	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } );
		// return apiFetch( {
		// 	path: action.path,
		// 	queryParams: action.queryParams,
		// } );
	},
};

export default controls;
