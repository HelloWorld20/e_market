<template>
	<div id="layout">
		<el-row>
			<el-col :span="6">
				<div class="menu" @click="handleClick($event)">
					<el-menu
						@open="handleOpen"
						@close="handleClose"

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
			</el-col>
			<el-col :span="18"><router-view></router-view></el-col>
		</el-row>
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
		handleOpen() {
			console.log('handleOpen');
		},
		handleClose() {
			console.log('handleClose');
		},
		handleClick(e) {
			// this.activityId = Number(e.target.getAttribute('data-id'));
			this.$router.push(e.target.getAttribute('data-id'));
		}
	}
};
</script>

<style lang='less' scoped>
#layout{
	width: 100%;
	height: 100%;
}
.menu{
	overflow-x: hidden;
}
</style>
