<template>
	<div id="layout">
		<div class="menu" v-show="menuVisibal" @click="handleClick($event)">
			<el-menu
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				default-active="1-1"
			>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item index="1-1" data-id="Category">分类管理</el-menu-item>
					<el-menu-item index="1-2" data-id="Goods">商品管理</el-menu-item>
					<el-menu-item index="1-3" data-id="HomeManage">首页管理</el-menu-item>
					<el-menu-item index="1-4" data-id="Recommend">推荐商品管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="2">
					<i class="el-icon-menu"></i>
					<span slot="title">导航二</span>
				</el-menu-item>
				<el-menu-item index="3">
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title" @click="logout">退出</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="router-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import {Row, Col, Menu, MenuItem, MenuItemGroup, Submenu} from 'element-ui';
import { logout } from './http/apis';
const MENU_HIDE_ROUTE = ['Login'];
export default {
	data() {
		return {
			activityId: 0,
			menuVisibal: true
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Menu.name]: Menu,
		[MenuItem.name]: MenuItem,
		[MenuItemGroup.name]: MenuItemGroup,
		[Submenu.name]: Submenu
	},
	created() {
		this.menuVisibal = !MENU_HIDE_ROUTE.includes(this.$route.name);
	},
	methods: {
		handleClick(e) {
			if (e.target.getAttribute('data-id')) {
				this.$router.push(e.target.getAttribute('data-id'));
			}
		},
		async logout() {
			await logout();
			this.$router.replace('Login');
		}
	},
	watch: {
		$route(val) {
			this.menuVisibal = !MENU_HIDE_ROUTE.includes(val.name);
		}
	}
};
</script>

<style lang='less' scoped>
#layout{
	width: 100%;
	height: 100%;
	display: flex;

}
.menu{
	overflow-x: hidden;
	flex-basis: 200px;
	width: 200px;
	min-width: 200px;
}
.router-view{
	// flex: 1;
	width: calc(100% - 200px);
	padding: 20px;
	box-sizing: border-box;
}
</style>
