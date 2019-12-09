<template>
	<section class="crawler">
		<div class="e-container" ref="container"></div>
	</section>
</template>
<script>
import echarts from 'echarts';
import { getCrawlerLowestPrise } from '../../http/apis';
export default {
	data() {
		return {};
	},
	async mounted() {
		let data = await getCrawlerLowestPrise();
		data = data[0].data;
		data = data.filter(v => {
			return !!v.lowestPrice;
		});

		let xAxisData = []; // 横向
		let seriesData = [];
		// {
		// 	from: '', to: '',
		// 	lowestPrice: [{
		// 		20191204: 123,
		// 		20191205: 321
		// 	}]
		// }
		let allLineData = data;
		let partLinesData = allLineData;
		partLinesData.forEach(oneLineData => {
			let priseDataForArrayDay = oneLineData.lowestPrice[0];

			seriesData.push({
				name: oneLineData.from + ' => ' + oneLineData.to,
				type: 'line',
				stack: '价格',
				data: Object.keys(priseDataForArrayDay).map(
					arrayDayKey => priseDataForArrayDay[arrayDayKey]
				)
			});
			xAxisData = xAxisData.map(v => v.slice(4));
		});

		const oneLineData = partLinesData[0];
		Object.keys(oneLineData.lowestPrice[0]).forEach(arrayDayKey => {
			xAxisData.push(arrayDayKey);
		});
		console.log('xAxisData', xAxisData);
		console.log('seriesData', seriesData);
		var option = {
			title: {
				text: '折线图堆叠'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: [
					'邮件营销',
					'联盟广告',
					'视频广告',
					'直接访问',
					'搜索引擎'
				]
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				// xAxis: xAxisData
				data: xAxisData
			},
			yAxis: {
				type: 'value'
			},
			series: seriesData
			// series: [
			// 	{
			// 		name: '广州 =》 沈阳',
			// 		type: 'line',
			// 		stack: '价格',
			// 		data: [120, 132, 101, 134, 90, 230, 210]
			// 	}
			// ]
		};

		// 使用刚指定的配置项和数据显示图表。
		this.init(option);
	},
	methods: {
		init(option) {
			var myChart = echarts.init(this.$refs['container']);
			myChart.setOption(option);
		}
	}
};
</script>
<style scoped lang="less">
.crawler {
	width: 100%;
	height: 100%;
}
.e-container {
	width: 100%;
	height: 100%;
}
</style>
