<template>
	<div id="headTitle">
		<ul class="breadcrumb">

			<li>

				<i class="icon-home"></i>

				<a href="index.html">首页</a>

				<span class="icon-angle-right"></span>

			</li>

			<li>

				<span >{{headTitle}}</span>
			</li>


		</ul>
	</div>
</template>

<script>
	
	   export default{
	   	  name:'headTitle',
	   	  computed:{
	   	  	 headTitle(){
	   	  	 	
	   	  	 	return this.$store.state.app.headTitle;
	   	  	 }
	   	  }
	   }
</script>

<style>
	#headTitle{
		position: fixed;
		width: 100%;
	}
</style>