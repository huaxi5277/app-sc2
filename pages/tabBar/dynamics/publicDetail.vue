<template>
	<view class="publicDetail-wrap">

		<view class="dynamics-wrap-item" v-for="(item,index) in initData " :key="index">
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
			<view v-if="item.img.length>0" class="dynamics-wrap-item-top-image-show">
				<view class="image-wrap-show" v-for="(imgItem,index) in item.img" :key="index">
					<image :src="imgItem" mode=""></image>
				</view>
			</view>
			<view v-if="item.video.length>0" class="dynamics-wrap-item-top-video-show">
				<view class="video-wrap-show" v-for="(videoItem,index) in item.video" :key="index">
					<video :src="videoItem" mode="" style="width: 500upx; height: 300upx;"></video>
				</view>
			</view>
		</view>


		<!-- 评论列表 -->

		<view class="comment-list">
			<view class="comment-title">
				评论
			</view>
			<view class="dynamics-wrap-item" v-for="(item,index) in commentList " :key="index">
				<view class="dynamics-wrap-item-top-avatar">
					<!--  头像 -->
					<view class="dynamics-wrap-item-top-avatar-img-wrap">
						<image :src="item.avatar" mode=""></image>
					</view>
					<view class="dynamics-wrap-item-top-avatar-date-wrap">
						<view class="title">
							{{item.name}}
						</view>
						<view class="time">
							{{dealTime(item.data)}}
						</view>
					</view>
			
				</view>
				<view class="dynamics-wrap-item-top-main-show">
					<view class="write">
						{{item.comment_msg}}
					</view>
				</view>
			</view>
		</view>
		<!-- 发表评论 -->
		<view class="comment-wrap">
			<view class="icon-wrap">
				<view class="icon-like-box box">
					<image src="../../../static/dym/点赞.png" mode=""></image>
					<text>赞</text>
					<!-- <image src="../../../static/dym/点赞%20(1).png" mode="" v-else=""></image> -->
					<!-- <text>{{isLike[index].len}}</text> -->
				</view>
				<view class="icon-content-box box"  @tap="changeShow">
					<image src="../../../static/dym/评论.png" mode=""></image>
					<!-- <image src="../../../static/dym/评论%20(1).png" mode=""></image> -->
					<text>评论</text>
				</view>
			</view>
		</view>
		<view class="popup spec" v-show="spaceInfo.showSpace" @tap="hideSpecifications">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="detailComment">
				<view class="content">
					<textarea value="" v-model="page" placeholder="说点什么吧" />
					</view>
				<!-- 确定按钮 -->
				<view class="btn">
					<view @tap="willrequest" class="button">确定</view>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	export default {
		data(){
			return {
				initData : [],
				page : "",
				spaceInfo: {
					showSpace: false,
					id : ""
				},
				commentList : [],
				currentUser : {}
			}
		},
		methods:{
			dealTime(time){
				const T = time.indexOf('T')
				time = time.substr(0,T)
			   return time 	
			},
				changeShow(){
						this.spaceInfo.showSpace = true;
				},
				hideSpecifications() {
					this.spaceInfo.showSpace = false;
				},
				willrequest(){
					if(this.page== ""){
						this.uni.showToast({
							title: '内容不能为空',
							icon: "none"
						})
					}
					else {
						let _self = this
						const user_id = uni.getStorageSync("_id")
						console.log(this.currentUser)
						uni.request({
							url:"http://localhost:5000/keep/public/add",
							method: "POST",
							data:{
								user : _self.currentUser,
								comment_id : this.spaceInfo.id,
								page : this.page
							},
							success(res) {
								_self.commentList = res.data.comment
							    _self.spaceInfo.showSpace = false
								_self.page = ""
							}
						})
					}
				},
				detailComment(){}
		},
		 onLoad(option) {
			 this.spaceInfo.id = option.data
			 let _self = this
			 uni.getStorage({
			 	key:"tiatok",
				success:(res=>{
					uni.request({
						url: "http://localhost:5000/keep/users/current",
						method: "GET",
						header: {
							'Authorization': JSON.parse(res.data).Token
						},
						success: (res) => {
							this.currentUser = res.data
						}
					})
				})
			 })
			uni.request({
				url: 'http://localhost:5000/keep/public/id/' + option.data,
				method: "GET",
				success: (result) => {
					console.log(result)
					if(result.data.errorStatus){
						uni.showToast({
							icon: "none",
							title: result.data.errorsMsg
						})
					}
					else {
						this.initData.push(result.data)
						console.log(this.initData[0].comment)
						this.commentList = this.initData[0].comment
						}
				}
			})
		 }
	}
</script>

<style lang="scss" scoped>
	.publicDetail-wrap{
		width: 100%;
		margin-top: 10upx;
		z-index: 97;
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
	}
	.comment-wrap{
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
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
					font-size: 28upx;
				}
			}
			.icon-content-box{
				border-left: 1px solid #C8C7CC ;
			}
		}
		}
		.bgc-ground{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
           background: rgba(7,17,27,0.6);
		   z-index: 98;
		   .content-box{
			   width: 100%;
			   height: 200upx;
			   background-color: #FFFFFF;
			   position: fixed;
			   bottom: 0;
			   z-index: 99;
			   .content-main{
				   width: 100%;
				   height: 100%;  
		   }
		   }
		   
		}
		.popup {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
		
			.mask {
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 21;
				background-color: rgba(0, 0, 0, 0.6);
			}
		
			.layer {
				position: fixed;
				z-index: 22;
				bottom: 0;
				width: 92%;
				padding: 0 4%;
				height: 70%;
				border-radius: 20upx 20upx 0 0;
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
		
				.content {
					width: 100%;
					padding: 20upx 0;
					textarea{
						width: 100%;
						height: 300upx;
					}
				}
		
				.btn {
					width: 100%;
					height: 100upx;
		
					.button {
						width: 100%;
						height: 80upx;
						border-radius: 40upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #f47952;
						font-size: 28upx;
					}
				}
			}
		}
		.comment-list{
			width: 100%;
			.comment-title{
				border-bottom: 1px solid #000;
				margin-bottom: 50upx;
				.comment-container{
					width: 100%;
					.content-container-item{
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
						
					}
				}
			}
		}
	}
</style>
