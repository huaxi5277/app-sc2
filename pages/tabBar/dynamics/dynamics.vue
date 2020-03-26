<template>
	<view class="dynamics-wrap">
		<view v-show="initData.length >0" class="dynamics-wrap-item" v-for="(item,index) in initData " :key="index" @tap="toDetailed(item,index)">
			<view class="dynamics-wrap-item-top-avatar">
				<!--  头像 -->
				<view class="dynamics-wrap-item-top-avatar-img-wrap">
					<image :src="item.user.avatar" mode=""></image>
				</view>
				<view class="dynamics-wrap-item-top-avatar-date-wrap">
					<view class="title">
						{{item.user.name}}
					</view>
					<view class="time">
						{{dealTime(item.date)}}
					</view>
				</view>
				
			</view>
			<view class="dynamics-wrap-item-top-main-show">
				<view class="write">
					{{item.page}}
				</view>
			</view>
			<view v-if="item.img.length>0"  class="dynamics-wrap-item-top-image-show">
				<view  class="image-wrap-show" v-for="(imgItem,index) in item.img" :key="index">
				   <image :src="imgItem" mode=""></image>
				</view>
			</view>
			<view v-if="item.video.length>0" class="dynamics-wrap-item-top-video-show">
				<view  class="video-wrap-show" v-for="(videoItem,index) in item.video" :key="index">
				   <video :src="videoItem" mode="" style="width: 500upx; height: 300upx;"></video>
				</view>
			</view>
			<view class="icon-wrap">
				<view class="icon-like-box box" @tap.stop="like(item,index)">
					<image src="../../../static/dym/点赞.png" mode="" v-if="!isLike[index].status"></image>
					<image src="../../../static/dym/点赞%20(1).png" mode="" v-else=""></image>
					<text>{{isLike[index].len}}</text>
				</view>
				<view class="icon-content-box box" @tap.stop="comment(item)">
					 <image src="../../../static/dym/评论.png" mode="" v-if="item.comment.length<=0"></image>
					 <image src="../../../static/dym/评论%20(1).png" mode="" v-else></image>
					 <text>{{item.comment.length}}</text>
				</view>
			</view>
		</view>
		<view v-if="initData.length<=0" class="noData">
			暂无发布信息
		</view>
	</view>
</template>
<script>
	
	export default {
		data(){
			return{
				initData : [],
				isLike :  [{
					status : false,
					len : 0
				}]
				
			}
		},
		onNavigationBarButtonTap() {
			const time = uni.getStorageSync("userTime")
			let currentTime = Date.now() / 1000
				uni.getStorage({
					key: "tiatok",
					success(res){
						uni.request({
							url: "http://localhost:5000/keep/users/willjwt",
							method: "POST",
							data: {
								current: currentTime,
								jwtd: JSON.parse(res.data).Token
							},
							success(result){
								if (result.data.callbackMsg) {
									uni.request({
										url: "http://localhost:5000/keep/users/current",
										method: "GET",
										header: {
											'Authorization': JSON.parse(res.data).Token
										},
										success: (res) => {
											
											uni.navigateTo({
												url:'./publish'
											})
										}
									})
								
								} else {
									uni.navigateTo({
										url : "../user/login"
									})
									try {
										uni.clearStorageSync();
									} catch (e) {
								       return 
									}
								}
							}
						})
					},
					fail() {
						uni.navigateTo({
							url : "../user/login"
						})
					}
				})
			
		},
		methods:{
			// 处理时间的函数 
			dealTime(time){
				const T = time.indexOf('T')
				time = time.substr(0,T)
			   return time 	
			},
			toDetailed(item,index){
			   	uni.navigateTo({
			   		url: './publicDetail?data=' + item._id
			   	})
			},
			showLike(item){
				if(item.likes.length == 0){
					return false
				}
				else {
					item.likes.forEach((item,index)=>{
					if(item == this._id){
						return false
					}
				
				})
				return true
				}
				
			},
			like(item,index){
				// 发起点赞请求
				   console.log(item)
				   let _self = this
					uni.getStorage({
						key: "_id",
						success: (res => {
							// 拿着 token  去 请求 current  拿到 id 
							// 先发起一个请求 jwtd: JSON.parse(res.data).Token
							uni.request({
								url: "http://localhost:5000/keep/public/like",
								method: "POST",
								data : {
									msg_id : item._id,
									like_id : res.data
								},
								success: (result) => {
									if(result.data.errorStatus){
										uni.showToast({
											icon: "none",
											title: result.data.errorsMsg
										})
									}
									// 就是点赞成功
									else {
										_self.isLike[index].status = true
										_self.isLike[index].len = _self.isLike[index].len+1
									}
								}
							})
					
						}),
						fail: () => {
							uni.showToast({
								icon: "none",
								title: "请登录"
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../user/login'
								})
							},2000)
						}
					})
			},
			comment(item){
			  uni.navigateTo({
			  	url: './publicDetail?data=' + item._id
			  })
			}
		},
		onShow() {
			this.isLike = []
			let _self = this
			const _id = uni.getStorageSync("_id")
			uni.request({
				url : "http://localhost:5000/keep/public",
				method: "GET",
				success: (result) => {
					this.initData = result.data
					let index = 0;
					let status = false
					let len = 0
					this.initData.forEach((item,index)=>{
                         len = item.likes.length
						item.likes.forEach((sitem,index)=>{
							if(sitem == _id){
								status = true
							}
							else {
								status = false
							}
						})
						_self.isLike.push({
						len,status
					})
					len = 0
					status = false
					})	
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	.dynamics-wrap{
		width: 100%;
		margin-top: 10upx;
		.dynamics-wrap-item{
			background-color: #F5F5F5;
			margin-bottom: 44upx ;
			.dynamics-wrap-item-top-avatar{
				width: 100%;
				height: 100upx;
				display: flex;
				.dynamics-wrap-item-top-avatar-img-wrap{
					width: 66upx;
					height: 100%;
					border-radius: 50%;
					margin-left: 30upx;
					margin-right: 30upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 66upx;
						height: 66upx;
						border-radius: 50%;
					}
				}
				.dynamics-wrap-item-top-avatar-date-wrap{
					width: 200upx;
					height: 100upx ;
					display: flex;
					flex-direction: column;
				    justify-content: center;
					.title{
						
				}
				.time{
					font-size: 24upx;
					}
			}
		}
		.dynamics-wrap-item-top-main-show{
			width: 100%;
			height: auto;
			margin-left:30upx ;
			min-height: 80upx;
			.write{
				overflow:hidden;
				
				text-overflow:ellipsis;
				
				white-space:nowrap;
			}
		}
		.dynamics-wrap-item-top-image-show{
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, calc(33.33% - 10px));
			grid-column-gap: 15px;
			.image-wrap-show{
				image{
					width: 100%;
					height: 300upx;
				}
			}
		}
		.dynamics-wrap-item-top-videl-show{
			.video-wrap-show{
				video{
					width: 300upx;
					height: 200upx;
				}
				
			}
		}
		.icon-wrap{
			width: 100%;
			height: 100upx;
			display: flex;
			border-top: 1px solid #8F8F94;
			.box{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				
				image{
					width: 44upx;
					height: 44upx;
				}
				text{
					margin-left: 10upx;
				}
			}
			.icon-content-box{
				border-left: 1px solid #C8C7CC ;
			}
		}
	}
	}
</style>