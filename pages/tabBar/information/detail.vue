<template>
	<view class="detail-wrap">
		<view class="top-wrap">
			<view class="title">
				{{title}}
			</view>
			<view class="time">
				{{time}}
			</view>
		</view>
		<view class="content-wrap">
			<view class="content-wrap-item" v-if="answerData.length>0 &&questionData.length>0" v-for="(item,aindex) in answerData "
			 :key="item">

				<view class="content-wrap-item-answer">
					<text>{{item}}</text>
				</view>

				<view class="content-wrap-item-question">{{questionData[aindex]}}</view>
			</view>
		</view>
		
		<view class="main-wrap">
			<view  class="content-wrap-item" v-for="(item,index) in renderShow " :key="index">
				<view class="content-wrap-item-msg">
					<text>{{item.msg}}</text>
				</view>
              <view class="ground-img">
              	<view  class="content-wrap-item-img-wrap" >
              		<image :src="item.img" mode=""></image>
              	</view>
              </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgData: [],
				msgData: [],
				questionData: [],
				answerData: [],
				title :"",
				time :"",
				src :"",
				renderShow:[]
			}
		},
		onLoad(option) {
			let main = JSON.parse(option.main)
			
			this.time = main.time
			this.src = main.src
			this.title = main.title
			let will = this.src.split("/")
			uni.request({
				url: "http://localhost:5000/keep/spider/news/detail",
				method: "POST",
				data: {
					main: will[will.length - 1].split('"')[0]
				},
				success: (result) => {
					if (result.data.callback.src) {
						this.imgData = result.data.callback.src
					}
					if (result.data.callback.msg) {
						this.msgData = result.data.callback.msg
					}
					if (result.data.callback.question) {
						this.questionData = result.data.callback.question
					}
					if (result.data.callback.answer) {
						this.answerData = result.data.callback.answer
					}
					if(this.imgData.length>=10){
						this.imgData.length = 10
					}
					if(this.msgData.length>=10){
						this.msgData.length = 10
					}
					
					this.msgData.forEach((item,index)=>{
						if(this.imgData[index] == undefined) return 
						let obj = {
							img : this.imgData[index],
							msg : item
						}
						this.renderShow.push(obj)
					})
					console.log(this.renderShow)
				},
				fail: () => {
					uni.showToast({
						icon: "none",
						title: "数据获取失败"
					})
				}
			})
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.detail-wrap {
		width: 92%;
		padding: 0 4%;
        .top-wrap{
			font-size: 36upx;
			font-weight: 700;
			.time{
				font-size: 24upx;
				color: #4CD964;
			}
		}
		.content-wrap {
			margin-top: 44upx;
			border-bottom: 1px solid #4CD964;
			margin-bottom: 44upx;

			.content-wrap-item {
				.content-wrap-item-answer {
					text {
						font-size: 32upx;
						color: rgb(0, 0, 255);
					}

				}

				.content-wrap-item-question {
					margin-top: 50upx;
					margin-bottom: 50upx;
					color: #666;
					font-size: 32upx;
				}
			}
		}

		.main-wrap {
			.content-wrap-item {
				margin-bottom: 33upx;
				.content-wrap-item-msg{
					text {
						color:  #E26E23;;
					}
				}
				.ground-img {
					width: 100%;
					.content-wrap-item-img-wrap {
                             margin: 0 auto;
						image {
							margin-top: 30upx ;
							width: 100%;
							height: 300upx;
						}
					}
				}
			}
		}
	}
</style>
