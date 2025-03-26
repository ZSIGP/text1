<template>
    <div class="connection-page">
      <!-- 流动背景 -->
      <div class="flowing-background" aria-hidden="true">
        <canvas ref="flowCanvas"></canvas>
      </div>
      
      <!-- 静点准备模态窗口 -->
      <StaticPointModal 
        :isVisible="showStaticPoint" 
        @close="closeStaticPoint" 
      />
      
      <!-- 主要内容区域 -->
      <div class="main-content" v-show="!showStaticPoint">
        <!-- 妙语卡片 -->
        <WisdomCard 
          :wisdomList="wisdomList"
          @wisdom-generated="onWisdomGenerated"
          @favorites-updated="onFavoritesUpdated"
          @timeline-updated="onTimelineUpdated"
        />
        
        <!-- 导航按钮 -->
        <div class="navigation-buttons">
          <router-link to="/alliance" class="nav-button">
            结盟
          </router-link>
          <router-link to="/resonance/knowledge/static-point" class="nav-button">
            共振
          </router-link>
        </div>
      </div>
      
      <!-- 时间轴 -->
      <Timeline ref="timeline" />
    </div>
  </template>
  
  <script>
  import StaticPointModal from '@/components/connection/StaticPointModal.vue'
  import WisdomCard from '@/components/connection/WisdomCard.vue'
  import Timeline from '@/components/connection/Timeline.vue'
  import wisdomData from '@/assets/data/wisdom.json'
  
  export default {
    name: 'Connection',
    components: {
      StaticPointModal,
      WisdomCard,
      Timeline
    },
    data() {
      return {
        showStaticPoint: true,
        wisdomList: [],
        flowAnimation: null
      }
    },
    methods: {
      // 关闭静点模态窗口
      closeStaticPoint() {
        this.showStaticPoint = false
        
        // 记录用户已经看过静点页面
        localStorage.setItem('staticPointShown', 'true')
      },
      
      // 检查是否需要显示静点页面
      checkStaticPointStatus() {
        // 获取上次访问时间
        const lastVisitTime = localStorage.getItem('lastVisitTime')
        const visitStartTime = localStorage.getItem('visitStartTime')
        const staticPointShown = localStorage.getItem('staticPointShown')
        
        // 如果用户是第一次访问，或者上次访问时间超过24小时，或者在首页停留时间不足1分钟
        if (!lastVisitTime || 
            (Date.now() - parseInt(lastVisitTime) > 24 * 60 * 60 * 1000) ||
            (visitStartTime && (Date.now() - parseInt(visitStartTime) < 60 * 1000))) {
          this.showStaticPoint = true
        } else if (staticPointShown === 'true') {
          // 如果用户已经看过静点页面，则不再显示
          this.showStaticPoint = false
        }
      },
      
      // 加载妙语数据
      loadWisdomData() {
        this.wisdomList = wisdomData.wisdomTexts
      },
      
      // 初始化流动背景
      initFlowingBackground() {
        const canvas = this.$refs.flowCanvas
        const ctx = canvas.getContext('2d')
        const width = canvas.width = window.innerWidth
        const height = canvas.height = window.innerHeight
        
        // 粒子数量
        const particleCount = 100
        
        // 粒子数组
        const particles = []
        
        // 创建粒子
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.3 + 0.1})`
          })
        }
        
        // 动画函数
        const animate = () => {
          // 清空画布
          ctx.clearRect(0, 0, width, height)
          
          // 更新和绘制粒子
          for (let i = 0; i < particleCount; i++) {
            const p = particles[i]
            
            // 更新位置
            p.x += p.speedX
            p.y += p.speedY
            
            // 边界检查
            if (p.x < 0 || p.x > width) p.speedX *= -1
            if (p.y < 0 || p.y > height) p.speedY *= -1
            
            // 绘制粒子
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
          }
          
          // 绘制连线
          ctx.strokeStyle = 'rgba(150, 150, 200, 0.1)'
          ctx.lineWidth = 0.5
          
          for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
              const p1 = particles[i]
              const p2 = particles[j]
              const dx = p1.x - p2.x
              const dy = p1.y - p2.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < 150) {
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.stroke()
              }
            }
          }
          
          // 继续动画
          this.flowAnimation = requestAnimationFrame(animate)
        }
        
        // 启动动画
        animate()
        
        // 窗口大小调整处理
        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        })
      },
      
      // 妙语生成事件处理
      onWisdomGenerated(wisdom) {
        console.log('生成新妙语:', wisdom)
        // 可以在这里添加额外的处理逻辑
      },
      
      // 收藏更新事件处理
      onFavoritesUpdated(favorites) {
        console.log('收藏已更新:', favorites)
        // 通知时间轴组件更新
        this.$root.$emit('timeline-updated')
      },
      
      // 时间轴更新事件处理
      onTimelineUpdated(timeline) {
        console.log('时间轴已更新')
        // 通知时间轴组件更新
        this.$root.$emit('timeline-updated')
      }
    },
    mounted() {
      // 检查是否需要显示静点页面
      this.checkStaticPointStatus()
      
      // 加载妙语数据
      this.loadWisdomData()
      
      // 初始化流动背景
      this.$nextTick(() => {
        this.initFlowingBackground()
      })
    },
    beforeUnmount() {
      // 清除动画
      if (this.flowAnimation) {
        cancelAnimationFrame(this.flowAnimation)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .connection-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .flowing-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 800px;
    margin-bottom: 60px; // 为时间轴留出空间
  }
  
  .navigation-buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .nav-button {
    padding: 0.8rem 1.5rem;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
    border: 1px solid rgba($primary-color, 0.3);
    border-radius: $border-radius-md;
    color: $text-color;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
      box-shadow: $shadow-light;
    }
  }
  
  @media (max-width: $breakpoint-md) {
    .connection-page {
      padding: 1rem;
    }
    
    .main-content {
      margin-bottom: 80px;
    }
  }
  </style>