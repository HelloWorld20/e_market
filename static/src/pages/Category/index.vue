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
export default {
	data() {
		return {
			menuData: [
				{ id: 'recommend', name: '推荐' },
				{ id: 'fruit', name: '水果' },
				{ id: 'vagitable', name: '蔬菜' },
				{ id: 'milk', name: '奶制品' },
				{ id: 'meet', name: '肉类' },
				{ id: 'import', name: '进口食品' },
				{ id: 'wather', name: '水产品' },
				{ id: 'oil', name: '粮油' }
			]
		};
	},
	components: { SideMenu },
	methods: {
		menuChange(e) {
			console.log('e', e);
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
