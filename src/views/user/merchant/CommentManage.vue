<template>
  <div>
    <h3>经营商端 - 评价管理</h3>
    <el-table :data="comments" border>
      <el-table-column prop="nickname" label="用户" />
      <el-table-column prop="content" label="评价内容" />
      <el-table-column prop="score" label="评分" />
      <el-table-column prop="createTime" label="时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="replyComment(row)">
            回复评价
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 模拟评价数据
const comments = ref([
  {
    id: 1,
    nickname: '张三',
    content: '景区环境很好，值得一去',
    score: 5,
    createTime: '2025-03-30'
  },
  {
    id: 2,
    nickname: '李四',
    content: '服务不错，就是人有点多',
    score: 4,
    createTime: '2025-03-30'
  }
])

// 回复评价
const replyComment = async (row) => {
  ElMessage.success(`成功回复用户：${row.nickname}`)
}
</script>