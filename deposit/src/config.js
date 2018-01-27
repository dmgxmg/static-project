requirejs.config({
	paths: {
		jquery: '/node_modules/jquery/dist/jquery.min',
		vue: '/node_modules/vue/dist/vue',
		lodash: '/node_modules/lodash/lodash.min',
		moment: '/node_modules/moment/min/moment.min',
		bootstrap: '/node_modules/bootstrap',

		text: '/node_modules/text/text'
	},
	map: {
		'*': {
			css: '/node_modules/require-css/css.min.js'
		}
	}
});