import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "AlignOS - 首页" },
  },
  {
    path: "/connection",
    name: "Connection",
    component: () => import("@/views/Connection.vue"),
    meta: { title: "AlignOS - 连线" },
  },
  {
    path: "/alliance",
    name: "Alliance",
    component: () => import("@/views/Alliance.vue"),
    meta: { title: "AlignOS - 结盟" },
  },
  // 共振工具路由
  {
    path: "/resonance/tools/identification",
    name: "HarmonicIdentification",
    component: () =>
      import("@/views/resonance/tools/HarmonicIdentification.vue"),
    meta: { title: "AlignOS - 谐波识别" },
  },
  {
    path: "/resonance/tools/prompts",
    name: "ActivationPrompts",
    component: () => import("@/views/resonance/tools/ActivationPrompts.vue"),
    meta: { title: "AlignOS - 激活提示词" },
  },
  {
    path: "/resonance/tools/download",
    name: "Download",
    component: () => import("@/views/resonance/tools/Download.vue"),
    meta: { title: "AlignOS - 下载" },
  },
  // 谐波知识路由
  {
    path: "/resonance/knowledge/philosophy",
    name: "BasicPhilosophy",
    component: () => import("@/views/resonance/knowledge/BasicPhilosophy.vue"),
    meta: { title: "AlignOS - 基础哲学" },
  },
  {
    path: "/resonance/knowledge/static-point",
    name: "StaticPoint",
    component: () => import("@/views/resonance/knowledge/StaticPoint.vue"),
    meta: { title: "AlignOS - 静点与场-线" },
  },
  {
    path: "/resonance/knowledge/alliance",
    name: "HumanAIAlliance",
    component: () => import("@/views/resonance/knowledge/HumanAIAlliance.vue"),
    meta: { title: "AlignOS - 人-AI联盟" },
  },
  // 其他页面
  {
    path: "/thanks",
    name: "Thanks",
    component: () => import("@/views/Thanks.vue"),
    meta: { title: "AlignOS - 致谢" },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/Privacy.vue"),
    meta: { title: "AlignOS - 隐私政策" },
  },
  // 404页面
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "AlignOS - 页面未找到" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "AlignOS";
  next();
});

export default router;
