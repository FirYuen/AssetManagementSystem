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
      let chartData = this.chartData
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
    },
    fetchData() {
      this.$axios.get("/mock/57018/api/runoffxy").then(resp => {
        this.propData(resp.data)
      });
    }
  },
  mounted() {
    this.initlineareachart(this.lineareachartData.chartInfo);

    setInterval(() => {
      this.fetchData();
    }, 5000);
  },
  components: {
    lineareachart
  }
};
</script>

<style scoped>
.stcakedareachart{
    height: 100%;
    width: 100%;
}
</style>
