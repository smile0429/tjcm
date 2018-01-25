<template>
	  	<div id="bar" class="Barflag">
            
			<div class="bar" :class="'bar'+barParam"></div>

		</div>
</template>

<script>
	 export default{
	 	props:['barParam'],
	 	data(){
	 		return{
	 			
	 		}
	 	}
	 }
</script>

<style>
     .Barflag{
		width: 100%;
		height: 20px;
		background-color: #EEEEEE;
	}
	.bar1{
		display: block;
		width: 25%;
		height: 20px;
		background-color:#35aa47;
	}
	.bar2{
		display: block;
		width: 50%;
		height: 20px;
		background-color:#35aa47;
	}
	.bar3{
		display: block;
		width: 75%;
		height: 20px;
		background-color:#35aa47;
	}
	.bar4{
		display: block;
		width: 100%;
		height: 20px;
		background-color:#35aa47;
	}
</style>