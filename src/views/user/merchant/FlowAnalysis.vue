<template>
  <el-container>
    <el-header>
      <h1>客流分析</h1>
    </el-header>
    <el-main>
      <!-- 热力图（ECharts实现） -->
      <div id="heatmap" style="width: 100%; height: 400px;"></div>

      <!-- 柱状图（客流趋势） -->
      <div id="barChart" style="width: 100%; height: 400px; margin-top: 20px;"></div>

      <!-- AI分析报告 -->
      <el-divider>AI生成分析报告</el-divider>
      <el-card>
        <pre>{{ aiReport }}</pre>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

let heatmapChart = null
let barChart = null
const aiReport = ref('')

// 初始化热力图
const initHeatmap = () => {
  heatmapChart = echarts.init(document.getElementById('heatmap'))
  heatmapChart.setOption({
    title: { text: '景区客流热力图' },
    tooltip: { formatter: '{b}: {c}人' },
    series: [{
      type: 'heatmap',
      data: [['入口', 120], ['展厅A', 80], ['展厅B', 50], ['出口', 30]]
    }]
  })
}

// 初始化柱状图
const initBarChart = () => {
  barChart = echarts.init(document.getElementById('barChart'))
  barChart.setOption({
    title: { text: '每日客流趋势' },
    xAxis: { data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [200, 180, 220, 250, 300, 500, 450] }]
  })
}

// 加载AI分析报告
onMounted(async () => {
  initHeatmap()
  initBarChart()
  window.addEventListener('resize', () => {
    heatmapChart.resize()
    barChart.resize()
  })

  // 调用AI接口生成报告
  const res = await axios.get('/api/ai/report')
  aiReport.value = res.data.report
})

onUnmounted(() => {
  heatmapChart.dispose()
  barChart.dispose()
})
</script>