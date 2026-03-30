import { createRouter, createWebHistory } from 'vue-router'

// 用户端
import UserHome from '@/views/user/Home.vue'
import ScenicDetail from '@/views/user/ScenicDetail.vue'

// 经营商端
import MerchantComment from '@/views/user/merchant/CommentManage.vue'
import MerchantFlow from '@/views/user/merchant/FlowAnalysis.vue'

// 政府端
// import AdminHome from '@/views/user/admin/Home.vue'
import AdminMonitor from '@/views/user/admin/FlowMonitor.vue'

const routes = [
  // 用户端
  { path: '/', component: UserHome },
  { path: '/scenic/:id', component: ScenicDetail },

  // 经营商端
  { path: '/merchant/comment', component: MerchantComment },
  { path: '/merchant/flow', component: MerchantFlow },

  // 政府端
  // { path: '/admin', component: AdminHome },
  { path: '/admin/monitor', component: AdminMonitor },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router