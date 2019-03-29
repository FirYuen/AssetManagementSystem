<template>
  <div class="stcakedareachart">
    <lineareachart v-bind:chart="chartData" ref="lineareachart"></lineareachart>
  </div>
</template>

<script>
import lineareachart from "./LineAreaChart";


export default {
  name: "stcakedareachart",
  data() {
    return {
      chartData: [[], []],
      lineareachartData: {
        chartInfo: {
          title: "实时文本分析",
          legend: {
            data: ["实时中文分析", "实时英文分析"]
          },
          name: ["实时中文分析", "实时英文分析"]
        }
      }
    };
  },
  methods: {
    initlineareachart(chartInfo) {
      this.$refs.lineareachart.initChart(chartInfo);
    },
    propData(respdata) {
      let chartData = this.$store.getters.linechartData
      if (chartData[0].length > 20) {
        chartData.forEach((e, i) => {
          e.shift()
          e.push([respdata.xData[0], respdata.yData[i].line[0]]);
        });
      } else {
        chartData.forEach((e, i) => {
          e.push([respdata.xData[0], respdata.yData[i].line[0]]);
        });
      }
      this.chartData = chartData
       this.$store.dispatch("setLineChartData",chartData); 
    },
    fetchData() {
      this.$axios.get("/mock/57018/api/runoffxy",{loading:false}).then(resp => {
        this.propData(resp.data)
      });
    }
  },
  mounted() {
    // this.fetchData();
    // setTimeout(() => {
    //   this.fetchData()
    // }, 1000);
     this.chartData = this.$store.getters.linechartData
    
    this.initlineareachart(this.lineareachartData.chartInfo);

   var timer =  setInterval(() => {
     console.log(this.$route.name)
     
     if(this.$route.name!=="home"){
       clearInterval(timer)
       this.$destroy()
     }else{
this.fetchData();
     }
      
      
    }, 5000);
  },
  components: {
    lineareachart
  }
};
</script>

<style scoped>
.stcakedareachart{
    height: 1000px;
    width: 450px;
}
</style>
