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
		<van-grid :column-num="2" class="home-rec">
			<van-grid-item v-for="(item, index) in recommendData" :key="index">
				<div class="home-rec-item">
					<div
						class="home-rec-item-img"
						:style="
							`background-image: url(${getImages(item.images)})`
						"
					></div>
					<div class="home-rec-item-name">{{ item.name }}</div>
					<div class="home-rec-item-desc">{{ item.desc }}</div>
					<div class="home-rec-item-control">
						<div class="home-rec-item-control-pirce">
							￥{{ item.prise }}
						</div>
						<van-button
							round
							type="primary"
							icon="cart-o"
						></van-button>
					</div>
				</div>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem } from 'vant';
import { mapActions } from 'vuex';
import { getRecommend } from '../../http/apis';
export default {
	data() {
		return {
			carousel: [],
			cateData: [],
			recommendData: []
		};
	},
	components: {
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem
	},
	async created() {
		this.getUserInfo();
		this.getHomeInfo().then(res => {
			// console.log(res.carousel);
			this.carousel = res.carousel;
		});
		const category = await this.getCategory();
		this.cateData = category;
		const recommendData = await getRecommend();
		this.recommendData = recommendData;
	},
	methods: {
		...mapActions(['getCategory', 'getUserInfo', 'getHomeInfo']),
		getImages(imageArr) {
			return `${window.location.protocol}//${imageArr[0]}`;
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
