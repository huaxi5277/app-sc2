<template>
	<view v-show="see.see" class="popup">
		<view class="mask"></view>
		<view class="layer">
			{{index}}
		<button type="default" @tap="add()">+1</button>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			see : Object
		},
		data(){
			return{
				index : 1
			}
		},
		onLoad(){
			console.log(1)
			console.log(see)
		},
		methods:{
			add(){
				console.log(this.index)
				console.log(this.see.see)
			  this.index++	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup{
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
			.layer{
				position: fixed;
				bottom: 0;
				width: 92%;
				padding: 0 4%;
				height: 70%;
				border-radius: 20upx 20upx 0 0;
				background-color: #fff;
				z-index: 22;
				transition: all 0.3 linear; 
			}
	}
</style>
