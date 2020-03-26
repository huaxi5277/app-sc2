<template>
	<view class="login-wrap">
		<!-- form 表达做登录 -->
		<form @submit="loginSubmit">
			<view class="login-username place ">
				<label class="user-style" for="username">
					用户名 :
				</label>
				<input type="text" placeholder="请输入用户名" id="username" v-model="name" />
			</view>
			<view class="login-username place ">
				<label class="user-style" for="email">
					邮 箱 :
				</label>
				<input type="text" placeholder="请输入邮箱" id="email" v-model="email" />
			</view>
			<view class="login-password place">
				<label class="user-style" for="password">
					密 码 :
				</label>
				<input type="password" placeholder="请输入密码" id="password" v-model="password">
			</view>
			<view class="login-to-register place register  " @tap="loginToRegister">
				已有账号立即登录
			</view>
			<view class="seat"></view>
			<button form-type="submit" class="submit">Submit</button>
		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name : "",
				email: "",
				password: ""
			}
		},
		methods: {
			loginSubmit() {
				this.toCheck(this.email, this.password,this.name)
				if (this.toCheck(this.email, this.password,this.name)) {
					// 将要发起请求 
					uni.request({
						url: 'http://localhost:5000/keep/users/register',
						method: 'POST',
						header: {},
						data: {
							name : this.name,
							email: this.email,
							password: this.password
						},
						success: (res) => {
							if (res.data.callbackEmail) {
								uni.showToast({
									icon: 'none',
									title: res.data.email
								})
							}
							if (res.data._id) {
								uni.navigateTo({
									url: './login'
								})
							}
							
						}
					})
				}
			},
			loginToRegister() {
				uni.navigateTo({
					url: './login'
				})
			},
			toCheck(username, password,name) {
				if (!this.$validate.isEmail(username)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的邮箱格式'
					})
					return 0
				} else if (!this.$validate.isPwd(password)) {
					uni.showToast({
						icon: 'none',
						title: '请输入6为的密码'
					})
					return 0
				}
				else if (!this.$validate.isName(name)) {
					uni.showToast({
						icon: 'none',
						title: '正确格式的用户名3-6字符'
					})
					return 0
				}
				return 1
			}
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.login-wrap {
		width: 92%;
		padding: 0 4%;
		height: 100%;
		padding-top: 100upx;
		position: relative;
		overflow-y: hidden;

		.place {
			border-bottom: 1px solid #FF99CC;
			margin-bottom: 50upx;

			input {
				width: 100%;
				height: 60upx;
				display: flex;
				padding: 50upx 0;
			}
		}

		.user-style {
			color: #993366;
		}

		.register.place {
			border-bottom: none;
			float: right;
			font-size: 28upx;
			color: #FF99CC;
		}

		.seat {
			width: 92%;
			padding: 0 4%;
			height: 70upx;
		}

		.submit {
			width: 90%;
			color: #9900CC;
		}

	}
</style>
