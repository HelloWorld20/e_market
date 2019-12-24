import echarts from 'echarts';
export default function(title, data, xAxisData) {
	return {
		tooltip: {
			trigger: 'axis',
			position(pt) {
				return [pt[0], '10%'];
			}
		},
		title: {
			left: 'center',
			text: title
		},
		xAxis: {
			data: xAxisData
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 100
			},
			{
				start: 0,
				end: 100
			}
		],
		series: [
			{
				name: title,
				type: 'line',
				smooth: true,
				symbol: 'none',
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						},
						{
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}
					])
				},
				data
			}
		]
	};

}
