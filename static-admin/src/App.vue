<template>
	<div id="layout">
		<div class="menu" @click="handleClick($event)">
			<el-menu
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item index="1-1" data-id="Category">分类管理</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
					<el-menu-item index="1-3">选项3</el-menu-item>
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
					<span slot="title">导航四</span>
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
export default {
	data() {
		return {
			activityId: 0
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
	methods: {
		handleClick(e) {
			this.$router.push(e.target.getAttribute('data-id'));
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
}
.router-view{
	flex: 1;
	padding: 20px;
	box-sizing: border-box;
}
</style>
