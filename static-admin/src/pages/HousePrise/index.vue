<template>
	<section class="house">
		<el-radio-group v-model="city">
			<el-radio-button label="sz">深圳</el-radio-button>
			<el-radio-button label="gz">广州</el-radio-button>
			<el-radio-button label="lz">柳州</el-radio-button>
		</el-radio-group>
		<div ref="el" class="chart" style="width: 100%; height: 100%"></div>
	</section>
</template>

<script>
import echarts from 'echarts';
import getOption from './options';
import {
	Checkbox,
	CheckboxGroup,
	CheckboxButton,
	Radio,
	RadioGroup,
	RadioButton
} from 'element-ui';
import { getHousePrise } from '../../http/apis-crawler';
let chartIns = null;
export default {
	data() {
		return {
			cities: ['sz'],
			city: 'sz'
		};
	},
	components: {
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[CheckboxButton.name]: CheckboxButton,
		[Radio.name]: Radio,
		[RadioGroup.name]: RadioGroup,
		[RadioButton.name]: RadioButton
	},
	async mounted() {
		try {
			const housePrise = await getHousePrise('sz');
			let xAxis = [];
			let data = [];
			housePrise.forEach(item => {
				xAxis.push(item[0]);
				data.push(item[1]);
			});
			chartIns = echarts.init(this.$refs.el);
			chartIns.setOption(getOption('深圳房价', data, xAxis));
		} catch (error) {
			console.warn(error);
		}
	},
	watch: {
		cities(val) {
			console.log(val);
		},
		async city(city) {
			const housePrise = await getHousePrise(city);
			let xAxis = [];
			let data = [];
			housePrise.forEach(item => {
				xAxis.push(item[0]);
				data.push(item[1]);
			});
			console.log(getOption('房价', data, xAxis));
			chartIns.setOption(getOption('房价', data, xAxis));
		}
	}
};
</script>

<style lang="less" scoped>
.house {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	.chart {
		flex: 1;
	}
}
</style>
