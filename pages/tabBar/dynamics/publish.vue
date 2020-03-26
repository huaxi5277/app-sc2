<template>
	<view class="publish-box">
		<view class="publish-wrap">
			<view class="publish">
				<textarea value="" v-model="page" placeholder="说点什么吧" />
				</view>
			<view class="icon-wrap">
				<view class="icon">
					<image class="update-video" src="../../../static/上传视频.png" mode="" @tap="updateVideo" :style="{opacity : this.imageList.length > 0 ? 0 : 1}"></image>
					<image class="update-img" src="../../../static/上传图片_l.png" mode="" @tap="updateImage" :style="{opacity : this.videoList.length > 0 ? 0 : 1}"></image>
				</view>
			</view>
		</view>
		<view class="will-wrap">
			
			<view class="view">
			<view class="image-wrap" v-if="imageList.length>0">
				<view class="image-wrap-item" v-for="(item,index) in imageList" :key="index" >
					<image src="../../../static/删除.png" mode="" class="delete-img" @tap="deleteimg(index)"></image>
					<image :src="item" mode=""></image>
				</view>
			</view>
			</view>
			
			<view class="video-wrap" v-if="videoList.length>0" @tap="isStatusFullShow()">
				<video :src="videoList[0] || ''" controls class="myVideo" id="myVideo" ></video>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				imageList : [],
				videoList : [],
				isFull : false,
				page : ""
			}
		},
		methods:{
			isStatusFullShow(){
				console.log(this.isFull)
			},
			updateImage(){
				let _self = this
				if(this.imageList.length>=3){
					uni.showToast({
						icon:"none",
						"title" : "图片上传最多3"
					})
					return 
				}
				else {
					uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						res.tempFilePaths.forEach((item,index)=>{
							_self.imageList.push(item)
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
			deleteimg(index){
				this.imageList.splice(index,1)
			},
			updateVideo(){
				let _self = this
				if(this.videoList.length>0){
					uni.showToast({
						icon:"none",
						"title" : "视频上传最多1"
					})
					return 
				}
				else{
					uni.chooseVideo({
						count : 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						console.log(res.tempFilePath)
						_self.videoList.push(res.tempFilePath)
					}
					})
				}
			},
		 async	changeImageBase64(item){
			  let response =  await pathToBase64(item)
			  return response
			}
		},
		 onNavigationBarButtonTap(){
			
			// 点击发布的时候  如果没有登录 跳登录 
		 if(!uni.getStorageSync("tiatok")){
			 uni.navigateTo({
			 	url: '../user/login'
			 })
		 }
		 else {
			 if(this.page !== ''){
		        const _id	= uni.getStorageSync("_id")
				var willUpdate = {}
				willUpdate._id = _id
				willUpdate.page = this.page
				willUpdate.willImgList = []
				willUpdate.willVideoList = []
				willUpdate.page = this.page
				if(this.imageList.length>0){
					let willImgList = []
					this.imageList.forEach((item,i)=>{
								pathToBase64(item).then((base64) => {
									willUpdate.willImgList.push(base64)
									if(willUpdate.willImgList.length ===this.imageList.length ){
										uni.getStorage({
											key: "tiatok",
											success: (res => {
												// 拿着 token  去 请求 current  拿到 id 
												// 先发起一个请求 jwtd: JSON.parse(res.data).Token
												uni.request({
													url: "http://localhost:5000/keep/public",
													method: "POST",
													header: {
														Authorization: JSON.parse(res.data).Token
													},
													data : {
														 willUpdate
													},
													success: (result) => {
														console.log(result)
														if(result.statusCode == 200){
															uni.switchTab({
																url: "./dynamics"
															})
														}
													}
												})
										
											})
										})
									}
								})
					})
				}
				if(this.videoList.length>0){
					this.videoList.forEach((item,i)=>{
						pathToBase64(item).then((base64) => {
							willUpdate.willVideoList.push(base64)
							if(willUpdate.willVideoList.length ===this.videoList.length ){
								uni.getStorage({
									key: "tiatok",
									success: (res => {
										// 拿着 token  去 请求 current  拿到 id 
										// 先发起一个请求 jwtd: JSON.parse(res.data).Token
										uni.request({
											url: "http://localhost:5000/keep/public",
											method: "POST",
											header: {
												Authorization: JSON.parse(res.data).Token
											},
											data : {
												 willUpdate
											},
											success: (result) => {
												console.log(result)
												if(result.statusCode == 200){
													uni.switchTab({
														url: "./dynamics"
													})
												}
											}
										})
								
									})
								})
							}
						})
					})
					
				}
				
			    
				// 发起请求 
				
				
				uni.getStorage({
					key: "tiatok",
					success: (res => {
						// 拿着 token  去 请求 current  拿到 id 
						// 先发起一个请求 jwtd: JSON.parse(res.data).Token
						uni.request({
							url: "http://localhost:5000/keep/public",
							method: "POST",
							header: {
								Authorization: JSON.parse(res.data).Token
							},
							data : {
								 willUpdate
							},
							success: (result) => {
								console.log(result)
								if(result.statusCode == 200){
									uni.switchTab({
										url: "./dynamics"
									})
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
				
			}
			else {
				uni.showToast({
					icon: "none",
					title: "输入内容不能为空"
				})
			}
		 }
			
		}
	}
</script>

<style lang="scss" scoped>
	.publish-box{
		overflow-x: hidden;
		.publish-wrap{
			width: 100%;
			height: 900upx;
			border-bottom: 1px solid #13227a;
			.publish{
				width: 100%;
				height: 800upx;
				textarea{
					width: 100%;
					height: 100%;
				}
			}
			.icon-wrap{
				width: 100%;
				height: 100upx;
				.icon{
					float: right;
					width: 30%;
					height: 100upx;
					line-height: 100upx;
					display: flex;
					align-items: center;
					image{
						width: 77upx;
						height: 77upx;
						margin-right: 22upx;
					}
					.update-video .active {
						display: none;
					}
					.update-img .active {
						display: none;
					}
				}
			}
		}
		.will-wrap{
			margin-top: 40upx;
			height: 600upx;
			.view{
				position: relative;
				
				.image-wrap{
					width: 100%;
					display: grid;
					margin-left: 20upx;
					margin-right: 20upx;
					grid-template-columns: repeat(3, calc(33.33% - 10px));
					height: 300upx;
					grid-column-gap: 10upx;
					grid-row-gap: 10upx;
					position: relative;
					.image-wrap-item{
						position: relative;
						
						.delete-img{
							position: absolute !important;
							top: 0 !important;
							right: 0 !important;
							width: 44upx !important;
							height: 44upx !important;
							z-index: 99;
						}
						image{
							z-index: 88;
							width: 100%;
							height: 300upx;
						}
					}
				    
				}
			}
			.video-wrap{
					width: 100%;
					display: flex;
					.myVideo{
						margin: 0 auto;
					}
			}
	}
	}
</style>
