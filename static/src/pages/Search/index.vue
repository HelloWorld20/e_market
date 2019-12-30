<template>
	<section class="search">
		<van-search
			placeholder="请输入搜索关键词"
			v-model="searchVal"
			show-action
			shape="round"
			@search="onSearch"
			@cancel="onCancel"
		/>
		<van-grid :column-num="2" class="search-res">
			<van-grid-item
				class="search-res-item"
				v-for="(item, index) in searchData"
				:key="index"
				><div class="search-res-item">
					<div
						class="search-res-item-img"
						:style="
							`background-image: url(${getImages(item.images)})`
						"
					></div>
					<div class="search-res-item-name">{{ item.name }}</div>
					<div class="search-res-item-desc">{{ item.desc }}</div>
					<div class="search-res-item-control">
						<div class="search-res-item-control-pirce">
							￥{{ item.prise }}
						</div>
						<van-button
							type="primary"
							icon="cart-o"
							@click="add2cart(item.id)"
						></van-button>
					</div></div
			></van-grid-item>
		</van-grid>
	</section>
</template>

<script>
import { Search, Grid, GridItem } from 'vant';
import { search } from '../../http/apis';
export default {
	data() {
		return {
			searchVal: '',
			searchData: []
		};
	},
	components: {
		[Search.name]: Search,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem
	},
	mounted() {
		const searchStr = this.$route.query.name;
		if (searchStr) {
			this.searchVal = searchStr;
			this.init();
		}
	},
	methods: {
		async init() {
			const searchRes = await search(this.searchVal);
			this.searchData = searchRes.list;
		},
		onSearch(str) {
			this.init();
		},
		onCancel() {
			this.searchVal = '';
			this.$router.replace('/Home');
		},
		getImages(imageArr) {
			return `${window.location.protocol}//${imageArr[0]}`;
		}
	}
};
</script>

<style lang="less" src="./index.less"></style>
