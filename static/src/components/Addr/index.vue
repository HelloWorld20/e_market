<template>
	<section class="c-addr">
		<div class="c-addr-item" :key="item.id" v-for="item in addrs">
			<div class="item-msg" @click="handleChoose(item)">
				<div class="item-msg-addr">{{ item.orderAddr }}</div>
				<div class="item-msg-contact">
					<div class="item-msg-contact-name">
						{{ item.orderName }}
					</div>
					<div class="item-msg-contact-phone">
						{{ item.orderPhone }}
					</div>
				</div>
			</div>
			<div class="item-control" v-if="type === 'edit'">
				<van-button @click="$emit('handleEdit', item)" type="primary"
					>编辑</van-button
				>
				<van-button
					@click="$emit('handleDelete', item.id)"
					type="danger"
					>删除</van-button
				>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		addrs: {
			type: Array,
			require: true
		},
		type: {
			type: String,
			default: 'edit'
		}
	},
	methods: {
		handleChoose(value) {
			if (this.type !== 'edit') this.$emit('itemClick', value);
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
