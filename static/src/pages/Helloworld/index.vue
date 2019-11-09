<template>
  <div>
    <h1>{{greeting}}</h1>
    <mt-button @click="this.getTestData">/test/api</mt-button>
    <mt-button @click="this.getRedis">getRedis</mt-button>
    <mt-button @click="this.setRedis">setRedis</mt-button>
    <mt-button @click="this.getMongo">getMongo</mt-button>
    <mt-button @click="this.addMongo">addMongo</mt-button>
    <mt-button @click="this.delMongo">delMongo</mt-button>
    <mt-button @click="this.updateMongo">updateMongo</mt-button>
    <hr />
    <input type="file" ref="file" />
    <mt-button @click="this.upload">上传文件</mt-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { $post } from '../../http/request';
import apis from '../../http/apis';
export default {
	data() {
		return {
			greeting: 'hello world'
		};
	},
	mounted() {
		this.getTestData();
	},
	methods: {
		...mapActions([
			'getTestData',
			'getRedis',
			'setRedis',
			'getMongo',
			'addMongo',
			'delMongo',
			'updateMongo'
		]),
		upload() {
			const formData = new FormData();
			formData.append('file', this.$refs.file.files[0]);
			$post(apis.upload, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
		}
	}
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

