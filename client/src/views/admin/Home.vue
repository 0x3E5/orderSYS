<template>
    <div class="home">
        <el-row>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-1">
                    <h3 class="card-title">今日订单</h3>
                    <span class="card-data">{{ cardData.orderCounts }}</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-2">
                    <h3 class="card-title">今日收入</h3>
                    <span class="card-data">￥{{ cardData.totalIncome }}</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-3">
                    <h3 class="card-title">商品数量</h3>
                    <span class="card-data">{{ cardData.commodityCounts }}</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-4">
                    <h3 class="card-title">分类数量</h3>
                    <span class="card-data">{{ cardData.categoryCounts }}</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div ref="panel" class="panel">
                    <chart ref="chart" :options="chartData" :auto-resize="true"></chart>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'home',
  data () {
    return {
      chartData: {
        title: {
          left: 'center',
          text: '运营状况统计',
          subtext: '每日的 "营业收入" 和 "订单数量" 数据统计'
        },
        legend: {
          type: 'plain',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          border: 'none',
          formatter: '营业收入: ￥{c0}<br />订单数量: &nbsp;{c1}'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: true
          },
          data: []
        },
        yAxis: {
          type: 'value',
          inside: true,
          axisLine: {
            onZero: true
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisPointer: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty'
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
          }
        ],
        series: [
          {
            name: '营业收入',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              color: '#8ec6ad'
            },
            stack: 'a',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#8ec6ad'
                }, {
                  offset: 1, color: '#ffe'
                }]
              }
            },
            data: []
          },
          {
            name: '订单数量',
            type: 'line',
            smooth: true,
            // stack: 'a',
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              color: '#FC7992'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#FC7992'
                }, {
                  offset: 1, color: '#ffe'
                }]
              }
            },
            data: []
          }
        ]
      },
      cardData: {
        orderCounts: 0,
        totalIncome: 0,
        commodityCounts: 0,
        categoryCounts: 0
      }
    }
  },
  methods: {
    async initCard () {
      try {
        const res = await this.$axios.post('/api/statistic/data', { date: new Date() })
        this.cardData = res.data.cardData
        this.chartData.xAxis.data = res.data.chartsData.xData
        this.chartData.series[0].data = res.data.chartsData.yIncome
        this.chartData.series[1].data = res.data.chartsData.yOrder
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.initCard()
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.panel, (element) => {
      if (this.$refs.chart) {
        this.$refs.chart.resize()
      }
    })
  }
}
</script>

<style>
    .home{
        height: 100%;
    }
    .home .home-card{
        padding: 5px;
    }
    .home-card > .card-bg{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 140px;
        border-radius: 10px;
    }
    .home-card > .card-bg::after{
        content: '';
        width: 300px;
        height: 200px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .2);
        position: absolute;
        top: 66%;
        right: 32%;
    }
    .home-card > .card-bg::before{
        content: '';
        width: 400px;
        height: 100px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .1);
        position: absolute;
        top: 72%;
        left: 24%;
    }
    .card-1{
        background-image: linear-gradient(230deg, #759bff, #843cf6);
    }
    .card-2{
        background-image: linear-gradient(230deg, #fc5286, #fbaaa2);
    }
    .card-3{
        background-image: linear-gradient(230deg, #ffc480, #ff763b);
    }
    .card-4{
        background-image: linear-gradient(230deg, #0e4cfd, #6a8eff);
    }
    .home-card > .card-bg > .card-title{
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        position: absolute;
        top: 12px;
        left: 12px;
        user-select: none;
    }
    .home-card > .card-bg > .card-data{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-size: 35px;
        font-weight: bold;
        user-select: none;
    }
    .home .panel{
        width: 100%;
        margin-top: 20px;
    }
    .home .panel > .echarts{
        width: 100%;
    }
</style>
