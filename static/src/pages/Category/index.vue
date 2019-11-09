<template>
  <div class="cate">
    <div class="cate-menu">
      <side-menu :menuData="menuData" @menuChange="menuChange"></side-menu>
    </div>
    <div class="cate-list">
      <ul>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
        <li class="cate-list-item"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import SideMenu from '@components/SideMenu';
import {mapActions} from 'vuex';
export default {
	data() {
		return {
			menuData: []
		};
	},
	components: { SideMenu },
	mounted() {
		this.getCategory().then(res => (this.menuData = res));
	},
	methods: {
		...mapActions(['getCategory']),
		menuChange(e) {
			console.log('e', e);
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
