<template>
  <el-container>
    <el-header>
      <h1>{{ scenicInfo.name }}</h1>
    </el-header>
    <el-main>
      <!-- 景区信息 -->
      <el-descriptions :model="scenicInfo" border>
        <el-descriptions-item label="地址">{{ scenicInfo.address }}</el-descriptions-item>
        <el-descriptions-item label="开放时间">{{ scenicInfo.openTime }}</el-descriptions-item>
      </el-descriptions>

      <!-- 评价区 -->
      <el-divider>用户评价</el-divider>
      <el-comment
        v-for="item in comments"
        :key="item.id"
        :author="item.nickname"
        :content="item.content"
        :datetime="item.createTime"
      />

      <!-- 发表评价 -->
      <el-input v-model="newComment" type="textarea" placeholder="发表你的评价" />
      <el-button @click="submitComment">提交评价</el-button>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const route = useRoute()
const scenicId = route.params.id
const scenicInfo = ref({})
const comments = ref([])
const newComment = ref('')

// 加载景区信息和评价
onMounted(async () => {
  const res = await axios.get(`/api/scenic/${scenicId}`)
  scenicInfo.value = res.data.scenic
  comments.value = res.data.comments
})

// 提交评价
const submitComment = async () => {
  await axios.post('/api/comment', {
    scenicId,
    content: newComment.value
  })
  ElMessage.success('评价提交成功')
  newComment.value = ''
}
</script>