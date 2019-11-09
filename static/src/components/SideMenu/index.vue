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
			default: () => [
				{id: 'recommend', name: '推荐'},
				{id: 'fruit', name: '水果'},
				{id: 'vagitable', name: '蔬菜'},
				{id: 'milk', name: '奶制品'},
				{id: 'meet', name: '肉类'},
				{id: 'import', name: '进口食品'},
				{id: 'wather', name: '水产品'},
				{id: 'oil', name: '粮油'}
			]
		}
	},
	mounted() {
		this.activeId = this.menuData[0].id;
	},
	methods: {
		handleClick(e) {
			this.activeId = e.target.getAttribute('data-id');
		}
	},
	watch: {
		activeId(val) {
			this.$emit('menuChange', val);
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
