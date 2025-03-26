<template>
    <div class="timeline-container" :class="{ 'expanded': isExpanded }">
      <button 
        class="timeline-toggle" 
        @click="toggleTimeline"
        :aria-label="isExpanded ? '收起时间轴' : '展开时间轴'"
      >
        <span class="toggle-icon" aria-hidden="true">
          {{ isExpanded ? '▼' : '▲' }}
        </span>
        <span>{{ isExpanded ? '收起' : '时间轴' }}</span>
      </button>
      
      <div class="timeline-content" v-if="isExpanded">
        <div class="timeline-filters">
          <button 
            class="filter-button" 
            :class="{ 'active': showFavoritesOnly }"
            @click="toggleFavoritesFilter"
          >
            <span class="filter-icon" aria-hidden="true">★</span>
            <span>仅显示收藏</span>
          </button>
          
          <button class="filter-button" @click="clearTimeline">
            <span class="filter-icon" aria-hidden="true">🗑️</span>
            <span>清空时间轴</span>
          </button>
        </div>
        
        <div class="timeline-items" ref="timelineItems">
          <div 
            v-for="(item, index) in filteredItems" 
            :key="item.id"
            class="timeline-item"
            :class="{ 'favorite': item.isFavorite }"
          >
            <div class="item-time">
              {{ formatTime(item.timestamp) }}
            </div>
            
            <div class="item-content">
              <p>{{ item.text }}</p>
              
              <div class="item-actions">
                <button 
                  class="item-action" 
                  @click="toggleFavorite(item)"
                  :aria-label="item.isFavorite ? '取消收藏' : '添加收藏'"
                >
                  <span aria-hidden="true">{{ item.isFavorite ? '★' : '☆' }}</span>
                </button>
                
                <button 
                  class="item-action" 
                  @click="copyItem(item)"
                  aria-label="复制文字"
                >
                  <span aria-hidden="true">📋</span>
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="filteredItems.length === 0" class="empty-state">
            <p>{{ showFavoritesOnly ? '暂无收藏项' : '时间轴为空' }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Timeline',
    data() {
      return {
        isExpanded: false,
        showFavoritesOnly: false,
        timelineItems: [],
        copyingItemId: null
      }
    },
    computed: {
      filteredItems() {
        if (this.showFavoritesOnly) {
          return this.timelineItems.filter(item => item.isFavorite)
        }
        return this.timelineItems
      }
    },
    methods: {
      // 切换时间轴展开/收起状态
      toggleTimeline() {
        this.isExpanded = !this.isExpanded
        
        if (this.isExpanded) {
          // 展开时加载数据
          this.loadTimelineData()
        }
      },
      
      // 切换仅显示收藏过滤器
      toggleFavoritesFilter() {
        this.showFavoritesOnly = !this.showFavoritesOnly
      },
      
      // 加载时间轴数据
      loadTimelineData() {
        const timelineData = JSON.parse(localStorage.getItem('alignos-timeline') || '[]')
        this.timelineItems = timelineData.reverse() // 最新的在前面
      },
      
      // 清空时间轴
      clearTimeline() {
        if (confirm('确定要清空时间轴吗？此操作不可撤销。')) {
          localStorage.removeItem('alignos-timeline')
          this.timelineItems = []
        }
      },
      
      // 切换收藏状态
      toggleFavorite(item) {
        // 更新当前项
        item.isFavorite = !item.isFavorite
        
        // 更新时间轴数据
        this.updateTimelineStorage()
        
        // 更新收藏数据
        this.updateFavoritesStorage()
      },
      
      // 复制项目文字
      copyItem(item) {
        navigator.clipboard.writeText(item.text)
          .then(() => {
            this.copyingItemId = item.id
            setTimeout(() => {
              this.copyingItemId = null
            }, 2000)
          })
          .catch(err => {
            console.error('无法复制文本: ', err)
          })
      },
      
      // 更新时间轴存储
      updateTimelineStorage() {
        // 反转回原来的顺序（最旧的在前面）
        const orderedItems = [...this.timelineItems].reverse()
        localStorage.setItem('alignos-timeline', JSON.stringify(orderedItems))
      },
      
      // 更新收藏存储
      updateFavoritesStorage() {
        // 获取所有收藏项
        const favorites = this.timelineItems
          .filter(item => item.isFavorite)
          .map(item => ({
            id: item.id,
            text: item.text,
            timestamp: item.timestamp,
            favoriteTime: new Date().toISOString()
          }))
        
        localStorage.setItem('alignos-favorites', JSON.stringify(favorites))
      },
      
      // 格式化时间
      formatTime(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString('zh-CN', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
    mounted() {
      // 监听时间轴更新事件
      this.$root.$on('timeline-updated', () => {
        if (this.isExpanded) {
          this.loadTimelineData()
        }
      })
    },
    beforeUnmount() {
      // 移除事件监听
      this.$root.$off('timeline-updated')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .timeline-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 90;
    transition: height 0.3s ease;
    height: 50px;
    
    &.expanded {
      height: 300px;
    }
  }
  
  .timeline-toggle {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: $text-color;
    
    &:hover {
      background: rgba($primary-color, 0.05);
    }
    
    .toggle-icon {
      font-size: 0.8rem;
    }
  }
  
  .timeline-content {
    height: calc(100% - 50px);
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .timeline-filters {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba($primary-color, 0.1);
  }
  
  .filter-button {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: $border-radius-sm;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba($primary-color, 0.1);
    }
    
    &.active {
      background: rgba($secondary-color, 0.1);
      color: $secondary-color;
    }
  }
  
  .timeline-items {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba($primary-color, 0.05);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba($primary-color, 0.2);
      border-radius: 3px;
      
      &:hover {
        background: rgba($primary-color, 0.3);
      }
    }
  }
  
  .timeline-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba($primary-color, 0.1);
  
  &.favorite {
    background-color: rgba($secondary-color, 0.05);
  }
}

.item-time {
  min-width: 100px;
  color: rgba($text-color, 0.7);
  font-size: 0.9rem;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  p {
    margin: 0;
    line-height: 1.5;
  }
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.item-action {
  background: none;
  border: none;
  padding: 0.3rem;
  cursor: pointer;
  color: rgba($text-color, 0.6);
  transition: all 0.2s ease;
  
  &:hover {
    color: $secondary-color;
  }
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: rgba($text-color, 0.5);
}

@media (max-width: $breakpoint-md) {
  .timeline-container.expanded {
    height: 50vh;
  }
  
  .item-time {
    min-width: 80px;
    font-size: 0.8rem;
  }
}
</style>