define([
	'text!component/deposit-detail.html',
	'lodash',
	'moment'
], function(
	tpl,
	_,
	moment
){
	function toFloat2(num){
		var n = parseFloat(num);
		if (_.isNaN(n)) return 0;
		var factor = Math.pow(10, 2);
		return Math.round(factor*n)/factor;
	}

	var user = {
		username: 'linping'
	};
	var depositList = [
		{
			type: 'deposit',
			confirmDate: '2017-11-28',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2017-12-20',
			yearRate: 3,
			money: 30000
		},
		{
			type: 'deposit',
			confirmDate: '2018-01-26',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2018-02-13',
			yearRate: 3,
			money: 20000
		}
	];

	return {
		template: tpl,
		data: function(){
			return {
				activeTab: 1,
				user: user,
				depositList: depositList
			};
		},
		computed: {
			dayStatList: function(){
				if (!this.depositList.length) return [];

				var startDate = this.depositList[0].confirmDate;
				var days = moment().startOf('day').diff(moment(startDate).startOf('day'), 'days');
				var list = [];

				for (var i=0; i <= days; i++) {
					var date = moment(startDate).add(i, 'days').format('YYYY-MM-DD');
					var dayDepositArr = [];
					var dayDrawArr = [];

					_.forEach(this.depositList, function(obj){
						if (moment(obj.confirmDate).isSame(moment(date), 'day')){
							switch(obj.type){
								case 'deposit':
									obj.accumMoney = obj.money;
									obj.curMoney = obj.money;
									dayDepositArr.push(obj);
									break;
								case 'draw':
									dayDrawArr.push(obj);
									break;
							}
						}
					});

					var depositMoney = toFloat2(_.sumBy(dayDepositArr, 'money'));
					var prevCurMoney = 0;
					var prevItem = _.last(list);

					if (prevItem) {
						_.forEach(prevItem.depositList, function(obj){
							obj.accumMoney = toFloat2(obj.curMoney*(1+obj.yearRate/36500));
						});

						dayDepositArr = _.concat(prevItem.depositList, dayDepositArr);
						prevCurMoney = prevItem.curMoney;
					}

					var drawMoney = toFloat2(_.sumBy(dayDrawArr, 'money'));
					var leftDrawMoney = drawMoney;

					_.forEach(dayDepositArr, function(obj){
						if (obj.accumMoney > leftDrawMoney){
							obj.curMoney = toFloat2(obj.accumMoney - leftDrawMoney);
							leftDrawMoney = 0;
						} else {
							obj.curMoney = 0;
							leftDrawMoney = toFloat2(leftDrawMoney - obj.accumMoney);
						}
					});

					var curMoney = toFloat2(_.sumBy(dayDepositArr, 'curMoney'));
					var accumMoney = toFloat2(_.sumBy(dayDepositArr, 'accumMoney'));
					var dayInterest = toFloat2(curMoney + drawMoney - depositMoney - prevCurMoney);
					var accumInterest = toFloat2((prevItem ? prevItem.accumInterest : 0) + dayInterest);
					var curCapital = toFloat2((prevItem ? prevItem.curCapital : 0) + depositMoney - drawMoney);
					var dayRate = toFloat2(dayInterest*10000/prevCurMoney);

					list.push({
						date: date,
						depositList: dayDepositArr,
						curMoney: curMoney,
						depositMoney: depositMoney,
						drawMoney: drawMoney,
						accumMoney: accumMoney,
						dayInterest: dayInterest,
						accumInterest: accumInterest,
						curCapital: curCapital,
						dayRate: dayRate,
						depositDays: i
					});
				}

				return _.reverse(list);
			},
			todayStat: function(){
				var date = moment().format('YYYY-MM-DD');
				var stat = _.find(this.dayStatList, {
					date: date
				});
				return stat || {
					date: date
				};
			}
		},
		filters: {
			depositType: function(type){
				switch(type){
					case 'deposit':
						return '存款(+)';
					case 'draw':
						return '取款(-)';
					default:
						return '[未知]';
				}
			}
		}
	};
});