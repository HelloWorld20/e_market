<template>
	<section class="login">
		<div class="login-content">
			<h1>登录</h1>
			<el-form :model="form" label-width="100px">
				<el-form-item label="用户名:" prop="username">
					<el-input focus v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码:" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleLogin(form)">登陆</el-button>
					<el-button type="primary" @click="handleRegist(form)">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>
<script>
import {Form, FormItem} from 'element-ui';
import { register, login } from '../../http/apis'
export default {
	data() {
		return {
			form: {
				username: 'username',
				password: 'password'
			}
		};
	},
	methods: {
		async handleLogin(e) {
			await login(e.username, e.password);
			this.$router.replace('/Category')
		},
		handleRegist(e) {
			register(e.username, e.password);
		}
	},
	components: {
		[Form.name]: Form,
		[FormItem.name]: FormItem
	}
};
</script>

<style lang="less" scoped>
.login{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	h1{
		text-align: center;
		margin-bottom: 50px;
	}
	&-content{
		width: 400px;
		height: auto;
		border-radius: 10px;
	}
}
</style>
