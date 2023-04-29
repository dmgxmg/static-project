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
		},
		{
			type: 'deposit',
			confirmDate: '2018-02-28',
			yearRate: 3,
			money: 20000
		},
		{
			type: 'deposit',
			confirmDate: '2018-03-16',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2018-03-29',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2018-04-18',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2018-05-07',
			yearRate: 3,
			money: 20000
		},
		{
			type: 'deposit',
			confirmDate: '2018-05-22',
			yearRate: 3,
			money: 30000
		},
		{
			type: 'deposit',
			confirmDate: '2018-06-17',
			yearRate: 3,
			money: 20000
		},
		{
			type: 'deposit',
			confirmDate: '2018-07-17',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2018-08-15',
			yearRate: 3,
			money: 20000
		},
		{
			type: 'draw',
			confirmDate: '2018-10-04',
			money: 13300
		},
		{
			type: 'deposit',
			confirmDate: '2018-10-18',
			yearRate: 3,
			money: 13300
		},
		{
			type: 'draw',
			confirmDate: '2019-06-24',
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2020-09-21',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2020-10-10',
			yearRate: 3,
			money: 58000
		},
		{
			type: 'deposit',
			confirmDate: '2021-09-16',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2022-01-30',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2022-03-01',
			yearRate: 3,
			money: 20000
		},
		{
			type: 'deposit',
			confirmDate: '2022-05-16',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2022-05-23',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2022-05-27',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2022-06-22',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2022-07-21',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2022-08-24',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2022-08-25',
			yearRate: 3,
			money: 4000
		},
		{
			type: 'deposit',
			confirmDate: '2022-09-22',
			yearRate: 3,
			money: 6000
		},
		{
			type: 'deposit',
			confirmDate: '2022-10-24',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2022-11-24',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2022-12-22',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2023-01-17',
			yearRate: 3,
			money: 8000
		},
		{
			type: 'deposit',
			confirmDate: '2023-02-23',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2023-03-02',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2023-03-05',
			yearRate: 3,
			money: 10000
		},
		{
			type: 'deposit',
			confirmDate: '2023-03-22',
			yearRate: 3,
			money: 7000
		},
		{
			type: 'deposit',
			confirmDate: '2023-04-22',
			yearRate: 3,
			money: 7000
		}
	];
	var rentConfig = {
		startDate: '2021-01-01',
		endDate: undefined,
		money: 1800,
		rentDay: 15
	};

	function updateDepositList(){
		var startDate = rentConfig.startDate;
		var endDate = rentConfig.endDate;
		var days = moment(endDate).startOf('day').diff(moment(startDate).startOf('day'), 'days');
		for (var i=0; i <= days; i++) {
			var m = moment(startDate).add(i, 'days');
			if (m.date() !== rentConfig.rentDay){
				continue;
			}

			depositList.push({
				type: 'rent',
				confirmDate: m.format('YYYY-MM-DD'),
				money: rentConfig.money
			});
		}
		depositList = _.sortBy(depositList, function(item){
			return new Date(item.confirmDate);
		});
	}

	updateDepositList();

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
								case 'rent':
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
			},
			reversedDepositList: function(){
				return _.reverse(this.depositList);
			}
		},
		filters: {
			depositType: function(type){
				switch(type){
					case 'deposit':
						return '存款';
					case 'draw':
						return '取款';
					case 'rent':
						return '房租';
					default:
						return '';
				}
			},
			depositSign: function(type){
				switch(type){
					case 'deposit':
						return '+';
					case 'draw':
					case 'rent':
						return '-';
					default:
						return '';
				}
			},
			signedMoney: function(money, sign){
				return money > 0 ? sign + money : money;
			}
		}
	};
});
