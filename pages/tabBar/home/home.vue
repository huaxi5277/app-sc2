<template>
	<!-- 自定义顶部导航栏 -->
	<view class="">
		<pageHeader />
		<view class="uni-textarea">
		    <textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
		 </view>
		<button type="default" @tap="show()">上传照片</button>
		<button type="default" @tap="update()">上传视频</button>
		<video v-if="videoSrc" :src="videoSrc" controls></video>
		<view class="icon iconfont">&#xe605;</view>
		 <view ref="input" class="input">
			 <input type="file" value="" /> 上传文件
		 </view>  
		<popup :see={see} />
	</view>

</template>

<script>
	import pageHeader from './pageHeader.vue'
	import popup from '../../components/popup.vue'
	export default {
		data() {
			return {
				see: false,
				videoSrc : null
			}
		},
		components: {
			pageHeader,
			popup
		},
		methods: {
			show() {
				let that  = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log(res)
						that.videoSrc = res.tempFilePath
					}
				})
				uni.chooseImage({
					count: 6,
					sizeType: ["original", "compressed"],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res.tempFiles)
					}
				})
			},
			update() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log(res)
					}
				})
			}
		},
		onLoad() {},
	}
</script>

<style>
</style>
