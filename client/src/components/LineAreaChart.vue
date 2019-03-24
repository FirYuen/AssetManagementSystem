<template>
  <div class="lineareachart" ref="lineareachart"></div>

</template>
<script>
export default {
  name: "lineareachart",
  props: {
    msg: String,
    chart: Array
  },
  data() {
    let colorUp = new this.$echarts.graphic.LinearGradient(0,0,0,1,
      [
        { offset: 0, color: "rgba(0, 255, 255,0.6)" },
        { offset: 1, color: "rgba(0, 255, 255,0.1)" }
      ],
      false
    );
    let colorDown = new this.$echarts.graphic.LinearGradient(0,0,0,1,
      [
        { offset: 0, color: "rgba(111, 255, 63,0.6)" },
        { offset: 1, color: "rgba(111, 255, 63,0.1)" }
      ],
      false
    );
    return {
      chartOption: {
        //表头
        title: {
          text: "",
          textAlign: "left",
          textStyle: {
            fontSize: "24",
            color: "#fff"
          }
        },
        //图标
        legend: {
          right: "36",
          top: "12",
          data: [],
          textStyle: {
            color: "#fff"
          }
        },
        //提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 2,
              type: "solid"
            }
          }
        },
        //布局
        grid: {
          left: "48",
          right: "36",
          bottom: "36"
        },
        //x轴
        xAxis: {
          type: "time",
          boundaryGap: false,
          splitLine: {
            show: true,
            interval: "auto",
            lineStyle: {
              color: ["rgba(255,255,255,0.1)"]
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["rgba(255,255,255,0.1)"]
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          }
        },
        //线
        series: [
          //数据1
          {
            name: "",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: [],
            areaStyle: {
              normal: {
                //渐变
                color: colorDown
              }
            },
            //图表标线
            itemStyle: {
              normal: {
                color: "#B2FF59"
              }
            },
            //线样式
            lineStyle: {
              normal: {
                width: 2
              }
            }
          },
          {
            name: "",
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle",
            symbolSize: 6,
            data: [],
            areaStyle: {
              normal: {
                color: colorUp
              }
            },
            itemStyle: {
              normal: {
                color: "#18FFFF"
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    initChart(option) {
      this.chartOption.title.text = option.title;

      this.chartOption.legend.data = option.legend.data;

      this.chartOption.series.forEach((e,i) => {
          this.chartOption.series[i].name = option.name[i]
      });

      this.myChart.setOption(this.chartOption);
    },
    updateData(newData) {
      this.chartOption.series.forEach((e,i)=>{
        this.chartOption.series[i].data = newData[i]
      })
    },
    updateChart(data) {
      this.updateData(data);
      this.myChart.setOption(this.chartOption);
    }
  },
  mounted() {
      let myChart = this.$echarts.init(this.$refs.lineareachart);
      this.myChart = myChart;
  },
  watch: {
    chart: function(val, oldVal) {    
      this.updateChart(val);
    }
  }
};
</script>
<style scoped>
.lineareachart {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
