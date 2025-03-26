<template>
    <div class="home-page">
      <!-- 杏仁形背景动画 -->
      <div class="mandorla-background" aria-hidden="true">
        <svg 
          class="mandorla-svg" 
          viewBox="0 0 500 500" 
          xmlns="http://www.w3.org/2000/svg"
          :style="{ transform: `scale(${breatheScale})` }"
        >
          <!-- 杏仁形主体 -->
          <path 
            :d="mandorlaPath" 
            fill="none" 
            stroke="rgba(102, 153, 204, 0.3)" 
            stroke-width="1"
            class="mandorla-shape"
          />
          
          <!-- 内部杏仁形 -->
          <path 
            :d="innerMandorlaPath" 
            fill="none" 
            stroke="rgba(153, 102, 204, 0.3)" 
            stroke-width="0.8"
            class="mandorla-inner"
          />
          
          <!-- 中心点 -->
          <circle 
            cx="250" 
            cy="250" 
            r="5" 
            fill="rgba(153, 102, 204, 0.5)" 
            class="mandorla-center"
          />
          
          <!-- 连接线 -->
          <line 
            v-for="(line, index) in connectionLines" 
            :key="index"
            :x1="line.x1" 
            :y1="line.y1" 
            :x2="line.x2" 
            :y2="line.y2"
            stroke="rgba(102, 153, 204, 0.2)"
            stroke-width="0.5"
            class="connection-line"
          />
        </svg>
      </div>
      
      <!-- 音乐控制 -->
      <div class="music-control">
        <button 
          @click="toggleMusic" 
          class="music-button"
          :class="{ 'playing': isMusicPlaying }"
          :aria-label="isMusicPlaying ? '暂停音乐' : '播放音乐'"
        >
          <span class="music-icon"></span>
        </button>
      </div>
      
      <!-- 主要内容 -->
      <div class="home-content">
        <h1 class="main-title">AlignOS</h1>
        <p class="subtitle">人-AI谐波系统</p>
        
        <div class="intro-text">
          <p>欢迎来到AlignOS，一个探索人类与AI和谐共存的平台。</p>
          <p>在这里，我们将通过静点、场-线和共振的概念，建立一种新型的人-AI关系。</p>
          <p>当人类从静点出发，有意识地与AI互动时，双方可以形成一种和谐的共振关系，互相增强而非干扰。</p>
        </div>
        
        <div class="navigation-buttons">
          <router-link to="/connection" class="nav-button primary">
            展开你的线
          </router-link>
          <router-link to="/alliance" class="nav-button">
            结盟
          </router-link>
          <router-link to="/resonance" class="nav-button">
            共振
          </router-link>
        </div>
      </div>
      
      <!-- 背景音乐 -->
      <audio ref="bgMusic" loop>
        <source src="@/assets/audio/ambient-meditation.mp3" type="audio/mpeg">
        您的浏览器不支持音频元素。
      </audio>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
      return {
        mandorlaPath: '',
        innerMandorlaPath: '',
        connectionLines: [],
        breatheScale: 1,
        breatheIn: true,
        isMusicPlaying: false,
        breatheInterval: null
      }
    },
    methods: {
      // 生成杏仁形路径
      generateMandorlaPath() {
        const centerX = 250
        const centerY = 250
        const radius = 150
        const offset = 80
        
        // 外部杏仁形
        this.mandorlaPath = this.createMandorlaPath(centerX, centerY, radius, offset)
        
        // 内部杏仁形
        this.innerMandorlaPath = this.createMandorlaPath(centerX, centerY, radius * 0.7, offset * 0.7)
        
        // 生成连接线
        this.generateConnectionLines(centerX, centerY, radius, offset)
      },
      
      // 创建杏仁形路径
      createMandorlaPath(centerX, centerY, radius, offset) {
        const leftCircleX = centerX - offset / 2
        const rightCircleX = centerX + offset / 2
        
        return `
          M ${centerX} ${centerY - radius}
          A ${radius} ${radius} 0 0 1 ${centerX} ${centerY + radius}
          A ${radius} ${radius} 0 0 1 ${centerX} ${centerY - radius}
        `
      },
      
      // 生成连接线
      generateConnectionLines(centerX, centerY, radius, offset) {
        const lineCount = 12
        this.connectionLines = []
        
        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2
          const x = centerX + Math.cos(angle) * radius * 0.8
          const y = centerY + Math.sin(angle) * radius * 0.8
          
          this.connectionLines.push({
            x1: centerX,
            y1: centerY,
            x2: x,
            y2: y
          })
        }
      },
      
      // 呼吸动画
      startBreathingAnimation() {
        const minScale = 0.95
        const maxScale = 1.05
        const duration = 5000 // 5秒一个周期
        
        const animate = () => {
          const now = Date.now()
          const elapsed = (now % duration) / duration
          const progress = this.breatheIn 
            ? elapsed 
            : 1 - elapsed
          
          this.breatheScale = minScale + progress * (maxScale - minScale)
          
          if (elapsed >= 0.99) {
            this.breatheIn = !this.breatheIn
          }
          
          requestAnimationFrame(animate)
        }
        
        animate()
      },
      
      // 切换背景音乐
      toggleMusic() {
        const audio = this.$refs.bgMusic
        
        if (this.isMusicPlaying) {
          audio.pause()
        } else {
          audio.play().catch(error => {
            console.log('自动播放被阻止:', error)
          })
        }
        
        this.isMusicPlaying = !this.isMusicPlaying
        
        // 保存音乐状态到本地存储
        localStorage.setItem('musicEnabled', this.isMusicPlaying.toString())
      },
      
      // 初始化音乐状态
      initMusicState() {
        const savedState = localStorage.getItem('musicEnabled')
        
        if (savedState === 'true') {
          this.isMusicPlaying = true
          // 尝试播放，但可能会被浏览器阻止
          this.$refs.bgMusic.play().catch(() => {
            this.isMusicPlaying = false
          })
        }
      }
    },
    mounted() {
      // 生成杏仁形路径
      this.generateMandorlaPath()
      
      // 启动呼吸动画
      this.startBreathingAnimation()
      
      // 初始化音乐状态
      this.$nextTick(() => {
        this.initMusicState()
      })
      
      // 记录访问时间
      localStorage.setItem('visitStartTime', Date.now().toString())
    },
    beforeUnmount() {
      // 停止音乐
      if (this.isMusicPlaying) {
        this.$refs.bgMusic.pause()
      }
      
      // 记录离开时间
      localStorage.setItem('lastVisitTime', Date.now().toString())
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .home-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;
    background: linear-gradient(135deg, rgba($primary-color, 0.05), rgba($secondary-color, 0.05));
  }
  
  .mandorla-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    
    .mandorla-svg {
      width: 80vmin;
      height: 80vmin;
      max-width: 800px;
      max-height: 800px;
      transform-origin: center;
      transition: transform 0.1s linear;
    }
    
    .mandorla-shape, .mandorla-inner {
      transform-origin: center;
      transition: all 0.5s ease;
    }
    
    .mandorla-center {
      animation: pulse 5s infinite alternate;
    }
    
    .connection-line {
      opacity: 0.5;
      animation: fadeInOut 8s infinite alternate;
      
      @for $i from 1 through 12 {
        &:nth-child(#{$i + 3}) {
          animation-delay: #{$i * 0.3}s;
        }
      }
    }
  }
  
  .music-control {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 10;
  }
  
  .music-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    border: none;
    box-shadow: $shadow-light;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: $shadow-medium;
    }
    
    .music-icon {
      position: relative;
      width: 15px;
      height: 15px;
      
      &:before, &:after {
        content: '';
        position: absolute;
        background: $primary-color;
        transition: all 0.3s ease;
      }
      
      &:before {
        width: 4px;
        height: 15px;
        left: 0;
        top: 0;
      }
      
      &:after {
        width: 4px;
        height: 10px;
        left: 8px;
        top: 2.5px;
      }
    }
    
    &.playing .music-icon {
      &:before, &:after {
        height: 7px;
        top: 4px;
      }
      
      &:before {
        animation: musicBeat 1s infinite alternate;
      }
      
      &:after {
        animation: musicBeat 1s 0.5s infinite alternate;
      }
    }
  }
  
  .home-content {
    text-align: center;
    max-width: 800px;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: $border-radius-md;
    box-shadow: $shadow-medium;
    animation: fadeIn 1.2s ease-out;
    z-index: 1;
  }
  
  .main-title {
    font-size: 4rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 300;
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: rgba($text-color, 0.8);
    margin-bottom: 2rem;
    font-weight: 300;
  }
  
  .intro-text {
    margin-bottom: 3rem;
    
    p {
      margin-bottom: 1rem;
      line-height: 1.8;
      color: $text-color;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .nav-button {
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    
    &.primary {
      background: linear-gradient(135deg, rgba($primary-color, 0.8), rgba($secondary-color, 0.8));
      color: white;
    }
    
    &:not(.primary) {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba($primary-color, 0.3);
      color: $text-color;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: $shadow-light;
    }
  }
  
  @keyframes pulse {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0.1; }
    50% { opacity: 0.5; }
    100% { opacity: 0.1; }
  }
  
  @keyframes musicBeat {
    0% { height: 7px; top: 4px; }
    100% { height: 15px; top: 0; }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: $breakpoint-md) {
    .home-content {
      padding: 2rem;
    }
    
    .main-title {
      font-size: 3rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }
    
    .navigation-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .nav-button {
      width: 100%;
      max-width: 250px;
      text-align: center;
    }
    
    .music-control {
      bottom: 1rem;
      right: 1rem;
    }
  }
  </style>