<template>
	<view class="user-wrap">
		<view class="user-box">
			<view class="user-left-img" @tap="selectImg">
				<image :src="userImg || changeImg " mode=""></image>
			</view>
			<view class="user-right-box" @tap="login">
				<view class="user-name">
					{{name || "点击登录"}}
				</view>
				<view class="user-icon" @tap="dynamics">
					<image src="../../../static/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="user-msg">
			<view class="user-msg-item" v-for="(item,index) in userList " :key="index" @tap="toUser(index)">
				<view class="front-icon">
					<image :src="item.front" mode=""></image>
					<view class="item-write">
						{{item.title}}
					</view>
				</view>
				<view class="img-wrap" @tap="dynamics">
					<image :src="item.src" mode=""></image>
				</view>
			</view>
			<!-- <button type="primary" @tap="layout">退出登录</button> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		pathToBase64,
		base64ToPath
	} from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				userName: "",
				userList: [{
						front: "../../../static/resive.png",
						title: "修改/完善个人信息",
						src: "../../../static/right.png"
					},
					{
						front: "../../../static/comment.png",
						title: "我的评论",
						src: "../../../static/right.png"
					},
					{
						front: "../../../static/collect.png",
						title: "我的收藏",
						src: "../../../static/right.png"
					}
				],
				id: "",
				name: "",
				email: "",
				userImg: "",
				initImg: ""
			}
		},
		computed: {
			...mapState(["changeImg"])
		},
		methods: {
			...mapMutations(["changeAvator"]),
			...mapActions(['getUserMsg']),
			layout(){
				uni.clearStorageSync();
			},
			toUser(index) {
				switch (index) {
					case 0:
						if (this.id) {
							uni.navigateTo({
								url: "./profile"
							})
						} else {
							uni.navigateTo({
								url: "./login"
							})

						}

						break;
					case 1:

						if (this.id) {
							uni.navigateTo({
								url: "./comment"
							})
						} else {
							uni.navigateTo({
								url: "./login"
							})

						}
						break;
					case 2:

						if (this.id) {
							uni.navigateTo({
								url: "./collection"
							})
						} else {
							uni.navigateTo({
								url: "./login"
							})

						}
						break;
				}

			},
			login() {
				if (this.id) {
					return
				} else {
					uni.navigateTo({
						url: './login'
					})
				}
			},
			selectImg() {
				if (!this.id) {
					return
				} else {
					let that = this
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
						success: function(res) {
							pathToBase64(res.tempFilePaths[0]).then((base64) => {
								uni.request({
									url: "http://47.96.156.131:5000/keep/users/avator",
									method: "POST",
									data: {
										_id: that.id,
										image: base64
									},
									success: (res) => {
										that.userImg = res.data.avatar
									},

									fail: () => {
										uni.showToast({
											icon: 'none',
											title: '上传图片过大'
										})
									}
								})
							})
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '上传失败'
							})
						}
					})
				}

			},
			dynamics() {
				if(this.id){
					uni.navigateTo({
					url: './dynamics'
				})
				}
				else {
					uni.navigateTo({
						url: './login'
					})
				}
				
			}
		},
		onShow() {
			let currentTime = Date.now() / 1000
			try {
				uni.getStorage({
					key: "tiatok",
					success: (res => {
						// 拿着 token  去 请求 current  拿到 id 
						// 先发起一个请求 
						uni.request({
							url: "http://47.96.156.131:5000/keep/users/willjwt",
							method: "POST",
							data: {
								current: currentTime,
								jwtd: JSON.parse(res.data).Token
							},
							success: (result) => {
								if (result.data.callbackMsg) {
									uni.request({
										url: "http://47.96.156.131:5000/keep/users/current",
										method: "GET",
										header: {
											'Authorization': JSON.parse(res.data).Token
										},
										success: (res) => {
											
											this.id = res.data.id
											this.name = res.data.name
											this.email = res.data.email
											this.userImg = res.data.avatar
											this.initImg = "../../../static/我的.png"
										}
									})

								} else {
									this.name = "点击登录"
									try {
										uni.clearStorageSync();
									} catch (e) {
                                       return 
									}
								}
							},
							fail: () => {

							}
						})

					})
				})
			} catch (e) {
				console.log(e)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.user-wrap {
		width: 92%;
		padding: 0 4%;
		height: 300upx;

		.user-box {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f0f0e8;

			.user-left-img {
				width: 20vw;
				height: 20vw;
				flex-shrink: 0;
				margin-right: 20upx;
				border: solid 1upx #8a8a8a;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}

			.user-right-box {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 36upx;

				.user-name {}

				.user-icon {
					width: 10vw;
					height: 10vw;
					float: right;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						flex-shrink: 0;
						width: 5vw;
						height: 5vw;
					}
				}
			}
		}

		.user-msg {
			margin-top: 100upx;
			width: 100%;
			height: 400upx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.user-msg-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: solid 1px #f0f0e8;
				margin-bottom: 25upx;
				padding: 25upx 0;

				.front-icon {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						flex-shrink: 0;
						width: 6vw;
						height: 6vw;
					}

					.item-write {
						width: 50vw;
						height: 100%;
						font-size: 32upx;
						margin-left: 20upx;
					}
				}


				.img-wrap {
					width: 10vw;
					height: 10vw;
					float: right;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						flex-shrink: 0;
						width: 5vw;
						height: 5vw;
					}
				}

			}
		}
	}
</style>
