<template>
	<div class="page-sidebar nav-collapse collapse fixedLeft">
		<ul class="page-sidebar-menu">
			
			<li class="" v-for="menuItem in menu">

                <router-link :to="menuItem.path" v-if="(menuItem.children!=undefined&&menuItem.children.length>1)?false:true">
                
                	<i :class="menuItem.icon"></i>

					<span class="title">{{menuItem.title}}</span>

					<span class="arrow " v-if="(menuItem.children!=undefined&&menuItem.children.length>1)?true:false"></span>

                </router-link>
               
               <a href="javascript:;" v-if="(menuItem.children!=undefined&&menuItem.children.length>1)?true:false">
                
                	<i :class="menuItem.icon"></i>

					<span class="title">{{menuItem.title}}</span>

					<span class="arrow " v-if="(menuItem.children!=undefined&&menuItem.children.length>1)?true:false"></span>

                </a>
                
				<ul class="sub-menu" v-if="(menuItem.children!=undefined&&menuItem.children.length>1)?true:false">

					<li v-for="menuchildItems in menuItem.children" @click="routerEvent(menuchildItems.path)">
						<router-link :to="menuchildItems.path" >{{menuchildItems.title}}</router-link>
					</li>
				</ul>

			</li>

			

		</ul>

	</div>
</template>

<script>
	
		import {AppJS} from 'common/js/vendorMain.js'
		
	   export default{
	   	 data(){
	   	 	return {
	   	 		
	   	 	}
	   	 },
        computed:{
        	menu(){
        		return this.$store.state.app.menuList;
        	}
        	
        },
	     methods:{
	  
		  	init(){
		  		this.$store.commit('updateMenulist');
		  		AppJS.init();
		  	},
		  	routerEvent(path){
		  		
		  		if(path=='/skgl/add'){
		  			this.$store.commit('keepStep');
		  			this.$store.commit('updatePutinId','');
		  			this.$store.commit('keepPutinstate');
		  			this.$store.commit('updataEditeype', 1);
		  		}
		  	}
	    },
		  mounted(){
		  	 this.init();
		  }
		
	   }
</script>

<style>

</style>