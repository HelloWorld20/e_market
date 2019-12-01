<template>
	<div class="home">
		<div class="home-carousel">
			<van-swipe :autoplay="4000" style="height: 100%">
				<van-swipe-item
					class="carousel-item"
					v-for="(item, index) in carousel"
					:key="index"
					:style="`background-image: url(${item})`"
				>
					<!-- <img class="carousel-item" :src="item" alt="" /> -->
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="home-category">
			<div
				class="home-category-item"
				:key="item.id"
				v-for="item in cateData"
			>
				{{ item.name }}
			</div>
		</div>
		<div class="home-recommend">
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
			<div class="home-recommend-item"></div>
		</div>
	</div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			carousel: [],
			cateData: []
		};
	},
	components: {
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem
	},
	async created() {
		this.getUserInfo();
		this.getHomeInfo().then(res => {
			// console.log(res.carousel);
			this.carousel = res.carousel;
		});
		const category = await this.getCategory();
		this.cateData = category;
	},
	methods: {
		...mapActions(['getCategory', 'getUserInfo', 'getHomeInfo'])
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
