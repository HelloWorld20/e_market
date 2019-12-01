<template>
    <div>
        <!-- <h1>{{greeting}}</h1>
    <van-button @click="this.getTestData">/test/api</van-button>
    <van-button @click="this.getRedis">getRedis</van-button>
    <van-button @click="this.setRedis">setRedis</van-button>
    <van-button @click="this.getMongo">getMongo</van-button>
    <van-button @click="this.addMongo">addMongo</van-button>
    <van-button @click="this.delMongo">delMongo</van-button>
    <van-button @click="this.updateMongo">updateMongo</van-button>
    <hr />
    <input type="file" ref="file" />
    <van-button @click="this.upload">上传文件</van-button> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { $post } from '../../http/request';
import apis from '../../http/apis';
export default {
	// data() {
	// 	return {
	// 		greeting: 'hello world'
	// 	};
	// },
	// mounted() {
	// 	this.getTestData();
	// },
	// methods: {
	// 	...mapActions([
	// 		'getTestData',
	// 		'getRedis',
	// 		'setRedis',
	// 		'getMongo',
	// 		'addMongo',
	// 		'delMongo',
	// 		'updateMongo'
	// 	]),
	// 	upload() {
	// 		const formData = new FormData();
	// 		formData.append('file', this.$refs.file.files[0]);
	// 		$post(apis.upload, formData, {
	// 			headers: { 'Content-Type': 'multipart/form-data' }
	// 		});
	// 	}
	// }
};
</script>

<style lang="less" scoped>
h1 {
    color: yellow;
    background-color: green;
    display: flex;
    animation: ani ease;
    &:after {
        content: 'a';
        color: purple;
    }
}
</style>
