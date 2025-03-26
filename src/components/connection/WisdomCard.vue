<template>
    <div class="wisdom-card">
      <div class="card-content">
        <!-- 文字内容区域 -->
        <div class="wisdom-text" ref="textContainer">
          <transition name="fade" mode="out-in">
            <p :key="currentWisdom.id" class="text-content">{{ currentWisdom.text }}</p>
          </transition>
        </div>
        
        <!-- 控制按钮组 -->
        <div class="card-actions">
          <button 
            class="action-button" 
            @click="copyToClipboard" 
            aria-label="复制文字"
            :disabled="isCopying"
          >
            <span class="icon" aria-hidden="true">{{ isCopying ? '✓' : '📋' }}</span>
          </button>
          
          <button 
            class="action-button" 
            @click="shareWisdom" 
            aria-label="分享文字"
          >
            <span class="icon" aria-hidden="true">🔗</span>
          </button>
          
          <button 
            class="action-button" 
            @click="saveToFavorites" 
            aria-label="收藏文字"
            :class="{ 'active': isFavorite }"
          >
            <span class="icon" aria-hidden="true">{{ isFavorite ? '★' : '☆' }}</span>
          </button>
        </div>
      </div>
      
      <!-- 生成新文字按钮 -->
      <button class="next-button" @click="generateNewWisdom">
        更多的场-线
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WisdomCard',
    props: {
      wisdomList: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentWisdom: { id: 0, text: '正在连接场线...' },
        isCopying: false,
        isFavorite: false,
        favorites: []
      }
    },
    methods: {
      // 生成新的随机妙语
      generateNewWisdom() {
        // 随机选择一条妙语
        const randomIndex = Math.floor(Math.random() * this.wisdomList.length)
        const newWisdom = this.wisdomList[randomIndex]
        
        // 设置当前妙语
        this.currentWisdom = {
          id: Date.now(), // 使用时间戳作为唯一ID
          text: newWisdom,
          timestamp: new Date().toISOString()
        }
        
        // 检查是否是收藏项
        this.checkIfFavorite()
        
        // 保存到时间轴
        this.saveToTimeline()
        
        // 触发事件通知父组件
        this.$emit('wisdom-generated', this.currentWisdom)
      },
      
      // 复制到剪贴板
      copyToClipboard() {
        navigator.clipboard.writeText(this.currentWisdom.text)
          .then(() => {
            this.isCopying = true
            setTimeout(() => {
              this.isCopying = false
            }, 2000)
          })
          .catch(err => {
            console.error('无法复制文本: ', err)
          })
      },
      
      // 分享功能
      shareWisdom() {
        if (navigator.share) {
          navigator.share({
            title: 'AlignOS - 场线妙语',
            text: this.currentWisdom.text,
            url: window.location.href
          }).catch(err => {
            console.error('分享失败: ', err)
          })
        } else {
          // 如果Web Share API不可用，则回退到复制链接
          const shareUrl = `${window.location.origin}/connection?wisdom=${encodeURIComponent(this.currentWisdom.text)}`
          navigator.clipboard.writeText(shareUrl)
            .then(() => {
              alert('链接已复制到剪贴板')
            })
            .catch(err => {
              console.error('无法复制链接: ', err)
            })
        }
      },
      
      // 保存到收藏
      saveToFavorites() {
        // 从localStorage加载收藏
        this.loadFavorites()
        
        if (this.isFavorite) {
          // 如果已经是收藏，则移除
          this.favorites = this.favorites.filter(fav => fav.text !== this.currentWisdom.text)
          this.isFavorite = false
        } else {
          // 否则添加到收藏
          this.favorites.push({
            ...this.currentWisdom,
            favoriteTime: new Date().toISOString()
          })
          this.isFavorite = true
        }
        
        // 保存到localStorage
        localStorage.setItem('alignos-favorites', JSON.stringify(this.favorites))
        
        // 触发事件通知父组件
        this.$emit('favorites-updated', this.favorites)
      },
      
      // 保存到时间轴
      saveToTimeline() {
        // 从localStorage加载时间轴
        let timeline = JSON.parse(localStorage.getItem('alignos-timeline') || '[]')
        
        // 添加当前妙语到时间轴
        timeline.push({
          ...this.currentWisdom,
          isFavorite: this.isFavorite
        })
        
        // 如果时间轴太长，保留最近的100条
        if (timeline.length > 100) {
          timeline = timeline.slice(-100)
        }
        
        // 保存到localStorage
        localStorage.setItem('alignos-timeline', JSON.stringify(timeline))
        
        // 触发事件通知父组件
        this.$emit('timeline-updated', timeline)
      },
      
      // 加载收藏
      loadFavorites() {
        this.favorites = JSON.parse(localStorage.getItem('alignos-favorites') || '[]')
      },
      
      // 检查当前妙语是否已收藏
      checkIfFavorite() {
        this.loadFavorites()
        this.isFavorite = this.favorites.some(fav => fav.text === this.currentWisdom.text)
      }
    },
    mounted() {
      // 初始化时生成一条妙语
      this.generateNewWisdom()
      
      // 检查URL参数是否包含分享的妙语
      const urlParams = new URLSearchParams(window.location.search)
      const sharedWisdom = urlParams.get('wisdom')
      
      if (sharedWisdom) {
        this.currentWisdom = {
          id: Date.now(),
          text: sharedWisdom,
          timestamp: new Date().toISOString()
        }
        this.checkIfFavorite()
        this.saveToTimeline()
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .wisdom-card {
    width: 100%;
    max-width: 600px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: $border-radius-md;
    box-shadow: $shadow-medium;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .wisdom-text {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
  }
  
  .text-content {
    font-size: 1.4rem;
    line-height: 1.6;
    color: $text-color;
    font-weight: 300;
  }
  
  .card-actions {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .action-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba($primary-color, 0.2);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &.active {
      background: rgba($secondary-color, 0.2);
      color: $secondary-color;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .icon {
      font-size: 1.2rem;
    }
  }
  
  .next-button {
    padding: 0.8rem 1.5rem;
    background: linear-gradient(
      135deg, 
      rgba($primary-color, 0.7), 
      rgba($secondary-color, 0.7)
    );
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: center;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  /* 过渡动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>