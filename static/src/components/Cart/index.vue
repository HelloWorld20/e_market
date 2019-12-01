<template>
	<section class="c-cart">
		<div
			class="c-cart-item"
			:key="item.id"
			v-for="(item, index) in cartsData"
		>
			<div class="item-delete" @click="$emit('handleDelete', item.id)">
				删除
			</div>
			<div
				class="item-image"
				:style="{
					backgroundImage: `url(${getImage(item.images)})`
				}"
			></div>
			<div class="item-content">
				<div class="item-content-title">{{ item.name }}</div>
				<div class="item-content-prise">
					单价：￥{{ item.prise }}{{ item.unit }}<br />
					总价：<b>￥{{ item.totalPrise }}</b>
				</div>
			</div>
			<div class="item-control" v-if="type === 'edit'">
				<div
					class="item-control-sub item-control-btn"
					@click="$emit('subNumber', index)"
				>
					-
				</div>
				<div class="item-control-number">{{ item.number }}</div>
				<div
					class="item-control-add item-control-btn"
					@click="$emit('addNumber', index)"
				>
					+
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		cartsData: {
			require: true,
			type: Array
		},
		type: {
			type: String,
			default: 'edit'
		}
	},
	methods: {
		getImage(imgArr) {
			return `${window.location.protocol}//${imgArr[0]}`;
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
