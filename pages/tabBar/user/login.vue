<template>
	<view class="login-wrap">
		<!-- form 表达做登录 -->
		<form >
			<view class="login-username place ">
				<label class="user-style" for="username">
					邮 箱 :
				</label>
				<input type="text" placeholder="请输入邮箱" id="username" v-model="username" />
			</view>
			<view class="login-password place">
				<label class="user-style" for="password">
					密 码 :
				</label>
				<input type="password" placeholder="请输入密码" id="password" v-model="password">
			</view>
			<view class="login-to-register place register  " @tap="loginToRegister">
				无账号立即注册
			</view>
			<view class="seat"></view>
			<button  class="submit" @tap="loginSubmit">Submit</button>
		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			loginSubmit() {
				this.toCheck(this.username, this.password)
				if (this.toCheck(this.username, this.password)) {
					// 将要发起请求 
					let obj = {
						email: this.username,
						password: this.password
					}
					uni.request({
						url: 'http://localhost:5000/keep/users/login',
						method: 'POST',
						header: {
							'content-type' : 'application/json'
						},
						data: {
							email: this.username,
							password: this.password
						},
						success: (res) => {
							if (res.data.callbackPasspord) {
								uni.showToast({
									icon: 'none',
									title: res.data.password
								})
							}
							if (res.data.callbackNoUser) {
								uni.showToast({
									icon: 'none',
									title: res.data.message
								})
							}
							if (res.data.success) {
								//  把 token 存到本地
								const token = res.data.token
								
								const tiatok = {
									Token : token,
									Time : Date.now()/1000
								}
								uni.setStorageSync('tiatok',JSON.stringify(tiatok))
								uni.switchTab({
									url: './user'
								})
							}
						},
						fail: () => {
						    console.log("失败")	
						},
						complete: () => {
						   console.log("完成")	
						}
					})
				}
			},
			loginToRegister() {
				uni.navigateTo({
					url: './register'
				})
			},
			toCheck(username, password) {
				if (!this.$validate.isEmail(this.username)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的邮箱格式'
					})
					return 0
				} else if (!this.$validate.isPwd(this.password)) {
					uni.showToast({
						icon: 'none',
						title: '请输入6位的密码'
					})
					return 0
				}
				return 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-wrap {
		width: 92%;
		padding: 0 4%;
		height: 800upx;
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
