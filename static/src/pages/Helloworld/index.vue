<template>
	<h1>{{greeting}}</h1>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			greeting: 'hello world'
		};
	},
	mounted() {
		this.getTestData();
	},
	methods: {
		...mapActions(['getTestData'])
	}
};
</script>

<style lang="less" scoped>
h1{
	color: yellow;
	background-color: green;
	display: flex;
	animation: ani ease;
	&:after{
		content: 'a';
		color: purple;
	}
}
</style>

