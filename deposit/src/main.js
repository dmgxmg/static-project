define([
	'component/app-header',
	'vue',
	'component/deposit-detail',

	'css!bootstrap/dist/css/bootstrap.min.css',
	'css!main.css'
], function(
	AppHeader,
	Vue,
	DepositDetail
){
	new Vue({
		el: '#app',
		components: {
			AppHeader: AppHeader,
			DepositDetail: DepositDetail
		}
	});
});
