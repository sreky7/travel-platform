<template>
  <el-container>
    <el-header>
      <h1>全市文旅人流监控</h1>
    </el-header>
    <el-main>
      <!-- 行政区热力图 -->
      <div id="districtHeatmap" style="width: 100%; height: 500px;"></div>

      <!-- 应急指引 -->
      <el-divider>应急管理</el-divider>
      <el-button type="danger" @click="sendEmergencyAlert">发布应急预警</el-button>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import { ElMessage } from 'element-plus'

let districtChart = null

// 初始化行政区热力图
const initDistrictChart = () => {
  districtChart = echarts.init(document.getElementById('districtHeatmap'))
  districtChart.setOption({
    title: { text: '各行政区文旅人流热力图' },
    tooltip: { formatter: '{b}: {c}人' },
    series: [{
      type: 'map',
      map: '武威市', // 可自定义地图（对应你家乡武威）
      data: [
        { name: '凉州区', value: 12000 },
        { name: '民勤县', value: 3000 },
        { name: '古浪县', value: 2500 },
        { name: '天祝县', value: 2000 }
      ]
    }]
  })
}

// 发布应急预警
const sendEmergencyAlert = async () => {
  await axios.post('/api/admin/emergency/alert', {
    content: '凉州区某景区人流过载，请错峰出行'
  })
  ElMessage.success('应急预警发布成功')
}

onMounted(() => {
  initDistrictChart()
  window.addEventListener('resize', () => districtChart.resize())
})

onUnmounted(() => {
  districtChart.dispose()
})
</script>