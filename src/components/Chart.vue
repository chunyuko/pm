<template>
  <div ref="chartDom" style="height: 100px"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  created() {
    // 防抖
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    addListener(this.$refs.chartDom, this.resize);
    this.renderChart();
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById("main"));
    // this.chart = echarts.init(this.$refs.chartDom);
    // // 绘制图表
    // this.chart.setOption({
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20],
    //     },
    //   ],
    // });
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option(val) {
      // 避免深度监听好性能问题，解决方案，就是将option 进行拷贝一份，这样引用改变，会导致option改变
      this.chart.setOption(val);
    },
  },
  methods: {
    resize(el) {
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById("main"));
      this.chart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      this.chart.setOption(this.option || {});
    },
  },
};
</script>
