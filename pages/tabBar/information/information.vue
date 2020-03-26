<template>
	<view class="information-wrap">
		<view class="change-photo-wrap">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper-container">
				<swiper-item v-for="(item,index) in imageList" :key="index" >
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		<!-- 分割线  -->
		<!-- <Splider></Splider> -->
		<view class="news-wrap">
			<view class="news-wrap-item" v-for="(item,index) in newsList" :key="index">
				
				<view class="content-right-wrap" @tap="toDetail(item)">
					<view class="content">
						<view class="content-title">
							<text>{{item.title}}</text>
						</view>
						<view class="bottom-icon-wrap">
							<text class="bottom-icon"></text>
							<text class="time">{{item.time}}</text>
						</view>
						<view class="content-main">
							<text>{{item.content}}</text>
							<text><text class="more-link">More »</text></text>
						</view>
						
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import Splider from '../../components/Splider.vue'
	export default {
		data(){
			return {
				imageList : [
					{
						img : "../../../static/轮播图/1.jpg"
					},
					{
						img : "../../../static/轮播图/2.jpg"
					},
					{
						img : "../../../static/轮播图/3.jpg"
					},
					{
						img : "../../../static/轮播图/4.jpg"
					},
					{
						img : "../../../static/轮播图/5.jpg"
					}
				],
				index : 0,
				newsList : []
			}
		},
		components:{
			Splider
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url: "./detail?main=" + JSON.stringify(item)
				})
			},
			initNews(index){
				uni.request({
					url:"http://localhost:5000/keep/spider/news",
					method:"POST",
					data:{
						index : index
					},
					success: (res) => {
						this.newsList = res.data
					}
				})
			}
		},
		onShow(){
			this.initNews(this.index)
		}
	}
</script>
<style lang="scss">
	.information-wrap{
		width: 94%;
		padding: 0 3%;
		height: 100%;
		.change-photo-wrap{
			.swiper-container{
				width: 100%;
				.swiper-item{
					image{
						width: 100%;
						height: 300upx;
					}
				}
				
			}
			
		}
		.news-wrap{
			margin-top: 22upx;
			.news-wrap-item{
				width: 100%;
				border-top: 1px solid #f0f0e8;
				padding: 10upx;
				margin-bottom: 22upx;
				.content-right-wrap{
					flex : 1;
					position: relative;
					.content{
						padding-top: 50upx ;
						.content-title{
							width: 100%;
							height: 50upx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							font-size: 34upx;
							color: #E26E23;
						}
						.content-main{
							width: 100%;
							overflow: hidden;
					        margin-top: 24upx;
							font-size: 28upx;
							color: #B799B7;
							a{
								text-decoration: none;
								.more-link{
									color: #FFDE6A;
									
								}
							}
						}
					}
					.bottom-icon-wrap{
						.time{
							font-size: 24upx;
							color: #C8C7CC;
						}
					}
				}
			}
		}
	}
	
</style>