<template>
    <div 
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
      v-show="isVisible"
    >
      <!-- 模态内容容器：使用CSS Grid布局 -->
      <section class="modal-content">
        <!-- 标题区域（对视觉用户隐藏，仅屏幕阅读器可读） -->
        <header class="modal-header">
          <h2 id="modalTitle" class="sr-only">静点准备 - 生命之花</h2>
        </header>
  
        <!-- SVG生命之花动画容器 -->
        <div class="flower-animation" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <!-- 基础圆形 -->
            <circle cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="rgba(102, 153, 204, 0.3)" 
                    stroke-width="0.5"/>
            
            <!-- 生命之花图案 -->
            <g class="flower-of-life">
              <circle v-for="(circle, index) in flowerCircles" 
                      :key="index"
                      :cx="circle.cx"
                      :cy="circle.cy"
                      r="20"
                      fill="none"
                      stroke="rgba(153, 102, 204, 0.3)"
                      stroke-width="0.3"
                      class="flower-circle"/>
            </g>
            
            <!-- 中心点 -->
            <circle cx="50" cy="50" r="3" 
                    fill="rgba(153, 102, 204, 0.5)"
                    class="center-point"/>
          </svg>
        </div>
  
        <!-- 妙语展示区：使用article增强语义 -->
        <article 
          id="modalDesc"
          class="wisdom-text"
          aria-live="polite"
        >
          <transition-group name="fade" tag="div">
            <p v-for="(line, index) in visibleTextLines" 
               :key="index"
               class="text-fade">
              {{ line }}
            </p>
          </transition-group>
        </article>
  
        <!-- 控制按钮组 -->
        <div class="control-group">
          <button
            class="breathing-button"
            @click="startConnection"
            aria-label="展开场-线（点击后进入连线页面）"
          >
            <!-- 悬浮效果指示器 -->
            <span class="pulse-ring" aria-hidden="true"></span>
            <span class="button-icon" aria-hidden="true">🌀</span>
          </button>
        </div>
      </section>
      
      <!-- 背景音乐 -->
      <audio 
        ref="bgMusic" 
        loop 
        preload="auto"
        class="sr-only"
      >
        <source src="@/assets/audio/static-point-music.mp3" type="audio/mpeg">
        您的浏览器不支持音频元素。
      </audio>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StaticPointModal',
    props: {
      isVisible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        textLines: [
          '静心于此刻',
          '感受内在的流动',
          '连接你的源场',
          '准备好了，就展开你的场-线'
        ],
        visibleTextLines: [],
        flowerCircles: [],
        isMusicPlaying: false
      }
    },
    methods: {
      startConnection() {
        // 通知父组件关闭模态窗口
        this.$emit('close')
        
        // 停止音乐
        if (this.isMusicPlaying) {
          this.$refs.bgMusic.pause()
        }
      },
      
      // 文字渐显逻辑
      revealText() {
        let index = 0
        const interval = setInterval(() => {
          if (index < this.textLines.length) {
            this.visibleTextLines.push(this.textLines[index])
            index++
          } else {
            clearInterval(interval)
          }
        }, 2000)
      },
      
      // 生成生命之花图案
      generateFlowerOfLife() {
        const centerX = 50
        const centerY = 50
        const radius = 20
        
        // 中心圆
        this.flowerCircles.push({ cx: centerX, cy: centerY })
        
        // 围绕中心的6个圆
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          this.flowerCircles.push({ cx: x, cy: y })
        }
      },
      
      // 尝试播放音乐
      playMusic() {
        this.$refs.bgMusic.play().then(() => {
          this.isMusicPlaying = true
        }).catch(() => {
          // 自动播放被阻止，这是预期的行为
          this.isMusicPlaying = false
        })
      }
    },
    watch: {
      isVisible(newVal) {
        if (newVal) {
          // 当模态窗口显示时
          this.visibleTextLines = []
          this.revealText()
          this.playMusic()
        } else {
          // 当模态窗口隐藏时
          if (this.isMusicPlaying) {
            this.$refs.bgMusic.pause()
          }
        }
      }
    },
    mounted() {
      // 生成生命之花图案
      this.generateFlowerOfLife()
      
      // 如果模态窗口一开始就是可见的，则启动文字渐显和音乐
      if (this.isVisible) {
        this.revealText()
        this.playMusic()
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  /* 蒙层样式 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(240, 245, 255, 0.95); /* 淡蓝色调 */
    display: grid;
    place-items: center;
    z-index: 999;
  }
  
  /* 模态内容容器 */
  .modal-content {
    width: min(90vw, 600px);
    height: min(80vh, 400px);
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 1.5rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.85);
    border-radius: $border-radius-md;
    box-shadow: $shadow-light;
    backdrop-filter: blur(4px);
  }
  
  /* 生命之花SVG容器 */
  .flower-animation {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    opacity: 0.6;
  }
  
  .flower-circle {
    animation: pulse 3s infinite alternate;
  }
  
  .center-point {
    animation: centerPulse 2s infinite;
  }
  
  /* 文字展示区 */
  .wisdom-text {
    text-align: center;
    color: $text-color;
    font-size: 1.2rem;
    line-height: 1.6;
    min-height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .text-fade {
    opacity: 0;
    animation: textFadeIn 2s forwards;
  }
  
  /* 呼吸按钮样式 */
  .breathing-button {
    position: relative;
    width: 60px;
    height: 60px;
    border: none;
    background: rgba($secondary-color, 0.3);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease;
    margin: 0 auto;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .pulse-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid rgba($secondary-color, 0.2);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .button-icon {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }
  
  .control-group {
    display: flex;
    justify-content: center;
  }
  
  /* 动画 */
  @keyframes pulse {
    0% { transform: scale(0.9); opacity: 1; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  
  @keyframes centerPulse {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
  
  @keyframes textFadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  /* 过渡动画 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>