<template>
	<view class="header-wrap">
		<view class="header-content">
			<button type="default">热门</button>
			<button type="default">此刻</button>
		</view>
		<view class="header-right">
			<image src="../../../static/发布.png" mode=""></image>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.header-wrap {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		background-color: #cdcdcd;
		top: 0;
		// 条件编译 设置离顶部的高度
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
       .header-content{
		   display: flex;
		   button{
			   width: 116upx;
			   background-color: #cdcdcd;
			   border: none;
			   padding: 0;
			   font-size: 38upx;
		   }
		   button:after{
			   content: '';
			   display: block;
			   width: 0;
			   height: 0;
		   }
	   }
	   .header-right{
		   float: right;
		   width: 44upx;
		   height: 44upx;
		   image{
			 width: 100%;
			   height: 100%;
		   }
	   }
	}
</style>
