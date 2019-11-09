<template>
	<div class="sidemenu">
		<ul @click="handleClick($event)">
			<li class="sidemenu-item" :class="{active: item.id === activeId}" :key="i" v-for="(item, i) in menuData" :data-id="item.id">
				{{item.name}}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeId: 'rec'
		};
	},
	props: {
		menuData: {
			type: Array,
			default: () => []
		}
	},
	mounted() {

	},
	methods: {
		handleClick(e) {
			this.activeId = Number(e.target.getAttribute('data-id'));
		}
	},
	watch: {
		activeId(val) {
			this.$emit('menuChange', val);
		},
		menuData(val) {
			if (val.length > 0) {
				this.activeId = this.menuData[0].id;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.sidemenu {
	float: left;
	width: 1rem;
	height: 100%;
	box-sizing: border-box;
	border-right: 1px solid red;
	overflow-x: hidden;
	overflow-y: auto;

	&-item{
		list-style: none;
		font-size: .2rem;
		height: .4rem;
		background-color: #dddddd;
		line-height: .4rem;
		text-align: center;
	}

	.active {
		background-color: white!important;
	}
}
</style>
