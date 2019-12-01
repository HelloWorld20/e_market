<template>
  <div id="wrapper">
    <router-view></router-view>
    <van-tabbar v-model="selected">
      <van-tabbar-item  icon="wap-home-o" name="Home">
        首页
      </van-tabbar-item>
      <van-tabbar-item  icon="search" name="Category">
        分类
      </van-tabbar-item>
      <van-tabbar-item  icon="cart-o" name="Cart">
        购物车
      </van-tabbar-item>
      <van-tabbar-item  icon="user-circle-o" name="Me">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
	data() {
		return {
			selected: 'Home'
		};
	},
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	watch: {
		selected(val) {
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
