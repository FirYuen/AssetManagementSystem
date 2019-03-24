<template>
     <div class="home">
         <div class="container">
        <div class="title">后台管理系统</div>
        <StackedChart></StackedChart>
         </div>
        
     </div>
</template>

<script>
import StackedChart from '../components/StackedChart';
export default {
  components: {
   StackedChart
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: #54709c;
  /* background: url(../assets/showcase.png) no-repeat; */
  background-size: 100% 100%;
}

.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  /* background-color: rgba(0, 0, 0, 0.7); */
  text-align: center;
  /* color: white; */
 color:#dddedd;
}
.title {
  font-size: 30px;
}
.stcakedareachart{
  display: inline;
  height: 40%;
  width: 80%;
  min-width: 600px;
  min-height: 300px
}
</style>
