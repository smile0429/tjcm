<template>
	<div id="app" class="mainTwo">
		    <my-head />
			<my-nav/>
			<div class="page-container">
				<router-view class="page-content" :key="key"/>
			</div>
			
			
	</div>
</template>

<script>
	import myHead from 'base/page/head'
	import myNav from 'base/page/nav'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			myHead,
			myNav
		},  
		mounted () {
	    	$(".mainTwo").parent().parent().css("height","auto");
	    },
	    
	    computed: {
		    key() {
		        return this.$route.name !== undefined? this.$route.name + new Date(): this.$route + new Date()
		    }
		 }
	}
</script>

<style scoped>
    /*html,body{
	    width:auto !important;
	    height:auto !important;
	    background: #f0f0f0;
	    overflow: auto !important;
	}*/
	.mainTwo{
		/*width:auto !important;
	    
	    background: #f0f0f0;
	    overflow: auto !important;*/
	}
</style>