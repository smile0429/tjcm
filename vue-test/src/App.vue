<template>
  <div id="app" class="app-main" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import "vendor/jeDate/skin/jedate.css";
.bodytrans{
	 width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: auto !important;
}
.app-main{
    width: 100%;
    height: 100%;
}
.page-container{
	 margin-top: 42px !important;
}


.redPoint {
	color: red;
}

#choseTip {
	margin-top: 20px;
	text-align: center;
	font-size: 18px;
}
  .fixedLeft{
  	position: fixed !important;
  }
  .underContent{
  	padding-top: 4%;
  }
  .stbtn{
		margin-bottom: 1% !important;
		margin-top: -2%;
		margin-right: 3%;
	}
</style>
