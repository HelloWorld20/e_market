<template>
  <div id="wrapper">
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <img slot="icon" src="@/assets/icon/shouye-.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="Category">
        <img slot="icon" src="@/assets/icon/fenlei-.png" />
        分类
      </mt-tab-item>
      <mt-tab-item id="Cart">
        <img slot="icon"  src="@/assets/icon/gouwuche-.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="Me">
        <img slot="icon"  src="@/assets/icon/wode-.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
export default {
	data() {
		return {
			selected: '外卖'
		};
	},
	components: {
		[Tabbar.name]: Tabbar,
		[TabItem.name]: TabItem
	},
	watch: {
		selected(val) {
			// console.log(val);
			this.$router.push(val);
		}
	}
};
</script>
<style lang="less" scoped>
#wrapper{
	padding-bottom: 55px;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow: auto;
}
.mint-tabbar{
	position: fixed;
	bottom: 0;left: 0;
	z-index: 98;
}
</style>
