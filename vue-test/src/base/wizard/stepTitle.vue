<template>
	
	     <div class="navbar steps">

				<div class="navbar-inner">
					<ul class="row-fluid">
		
						<li class="span3 forstep" :class="stepParam>=1? 'active' : ''">
		
							<a href="javascript:void(0)"   class="step" >
		
							<span class="number">1</span>
		
							<span class="desc"><i class="icon-ok"></i>上刊基本信息</span>   
		
							</a>
		
						</li>
		                <li class="span3 forstep" :class="stepParam>=2? 'active' : ''">
		
							<a href="javascript:void(0)"   class="step" >
		
							<span class="number">2</span>
		
							<span class="desc"><i class="icon-ok"></i>上传素材</span>   
		
							</a>
		
						</li>
						<li class="span3 forstep" :class="stepParam>=3? 'active' : ''">
		
							<a href="javascript:void(0)"  class="step" >
		
							<span class="number">3</span>
		
							<span class="desc"><i class="icon-ok"></i>选择终端</span>   
		
							</a>
		
						</li>
		
						<li class="span3 forstep" :class="stepParam==4? 'active' : ''">
		
							<a href="javascript:void(0)"   class="step" >
		
							<span class="number">4</span>
		
							<span class="desc"><i class="icon-ok"></i>完成</span>   
		
							</a>
		
						</li>
		
					</ul>
		
				</div>
		
			</div>
</template>

<script>
	 export default{
	 	props:['stepParam'],
	 	data(){
	 		return{
	 			
	 		}
	 	},
	 	methods:{
	 	}
	 }
</script>

<style>
	 .form-wizard .step .number {
	    
	    padding: 15px 20px 15px 20px !important;
	   
	}
	.form-wizard .steps .navbar-inner li>a.active .number{
	    background-color: #35aa47 !important;
	    color: #FFFFFF;   
	}
</style>