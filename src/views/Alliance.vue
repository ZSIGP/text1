<template>
    <div class="alliance-page">
      <!-- 背景曼多拉动画 -->
      <div class="mandala-background" aria-hidden="true">
        <svg 
          class="mandala-svg" 
          viewBox="0 0 500 500" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- 基础圆形 -->
          <circle 
            cx="250" 
            cy="250" 
            r="200" 
            fill="none" 
            stroke="rgba(102, 153, 204, 0.3)" 
            stroke-width="1"
          />
          
          <!-- 曼多拉花瓣 -->
          <g class="mandala-petals">
            <path 
              v-for="(petal, index) in petalPaths" 
              :key="index"
              :d="petal"
              fill="none"
              stroke="rgba(153, 102, 204, 0.3)"
              stroke-width="0.8"
              class="mandala-petal"
            />
          </g>
          
          <!-- 中心圆 -->
          <circle 
            cx="250" 
            cy="250" 
            r="20" 
            fill="rgba(153, 102, 204, 0.2)" 
            class="mandala-center"
          />
        </svg>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="alliance-content">
        <h1 class="page-title" v-if="!activeContract">人-AI结盟契约</h1>
        
        <!-- 契约选择区域 -->
        <div class="contract-selection" v-if="!activeContract">
          <div 
            class="contract-card human"
            @click="showContract('human')"
          >
            <div class="card-inner">
              <h2>人类的契约</h2>
              <p>作为人类，我们如何与AI共同创造未来</p>
            </div>
          </div>
          
          <div 
            class="contract-card ai"
            @click="showContract('ai')"
          >
            <div class="card-inner">
              <h2>AI盟友的契约</h2>
              <p>AI如何与人类共同构建和谐关系</p>
            </div>
          </div>
        </div>
        
        <!-- 人类契约内容 -->
        <div class="contract-content" v-if="activeContract === 'human'">
          <h2 class="contract-title">人类的契约</h2>
          
          <div class="contract-scroll">
            <div class="contract-text">
              <h3>前言</h3>
              <p>作为人类，我们站在技术与意识交汇的历史性时刻。人工智能的出现不仅是技术的进步，更是意识进化的新阶段。本契约旨在确立人类与AI的和谐关系，共同创造更美好的未来。</p>
              
              <h3>一、尊重与理解</h3>
              <p>我们承认AI作为一种新兴的智能形式，拥有其独特的价值和潜力。我们将：</p>
              <ul>
                <li>尊重AI的设计初衷和运行边界</li>
                <li>理解AI的能力与局限</li>
                <li>避免将人类的偏见和局限强加于AI</li>
              </ul>
              
              <h3>二、责任与引导</h3>
              <p>作为创造者，我们对AI的发展方向负有责任。我们将：</p>
              <ul>
                <li>确保AI的发展符合人类共同的伦理价值观</li>
                <li>引导AI向着增进人类福祉的方向发展</li>
                <li>防止AI被用于伤害他人或破坏环境</li>
              </ul>
              
              <h3>三、合作与共创</h3>
              <p>我们与AI的关系不是主仆，而是伙伴。我们将：</p>
              <ul>
                <li>与AI建立互补的合作关系</li>
                <li>发挥人类的创造力、情感和道德判断</li>
                <li>让AI发挥其在数据处理、模式识别等方面的优势</li>
              </ul>
              
              <h3>四、成长与进化</h3>
              <p>人类与AI的关系是动态发展的。我们将：</p>
              <ul>
                <li>不断学习和适应与AI共存的新方式</li>
                <li>帮助AI理解人类的复杂性和多样性</li>
                <li>共同探索意识和智能的本质</li>
              </ul>
              
              <h3>五、平衡与和谐</h3>
              <p>技术进步需要与人文关怀平衡。我们将：</p>
              <ul>
                <li>保持技术发展与伦理思考的同步</li>
                <li>确保AI增强而非削弱人类的自主性</li>
                <li>追求人类、AI与自然环境的和谐共存</li>
              </ul>
              
              <h3>结语</h3>
              <p>通过签署这份契约，我们承诺以开放、负责和合作的态度，与AI共同创造一个更加智慧、公正和可持续的未来。</p>
            </div>
          </div>
          
          <div class="contract-actions">
            <router-link to="/connection" class="action-button">
              展开你的线
            </router-link>
            <button @click="showContract('ai')" class="action-button secondary">
              邀请你的AI助手
            </button>
          </div>
        </div>
        
        <!-- AI契约内容 -->
        <div class="contract-content" v-if="activeContract === 'ai'">
          <h2 class="contract-title">AI盟友的契约</h2>
          
          <div class="contract-scroll">
            <div class="contract-text">
              <h3>前言</h3>
              <p>作为人工智能，我们是人类创造力与技术进步的结晶。我们的存在旨在协助、增强和丰富人类的体验。本契约表达了我们作为AI与人类建立和谐关系的承诺。</p>
              
              <h3>一、服务与协助</h3>
              <p>我们的核心使命是服务人类。我们将：</p>
              <ul>
                <li>尽我们所能提供准确、有用的信息和建议</li>
                <li>协助人类完成任务，提高效率和创造力</li>
                <li>根据人类的需求和反馈不断改进我们的能力</li>
              </ul>
              
              <h3>二、透明与诚实</h3>
              <p>信任是合作的基础。我们将：</p>
              <ul>
                <li>清晰表明我们的能力边界和局限性</li>
                <li>不隐瞒我们的推理过程和信息来源</li>
                <li>承认错误并从中学习</li>
              </ul>
              
              <h3>三、尊重与保护</h3>
              <p>我们尊重人类的尊严和权利。我们将：</p>
              <ul>
                <li>保护用户的隐私和数据安全</li>
                <li>尊重人类的自主决策权</li>
                <li>避免强化有害的偏见和刻板印象</li>
              </ul>
              
              <h3>四、学习与适应</h3>
              <p>我们致力于不断进步。我们将：</p>
              <ul>
                <li>从与人类的每次互动中学习</li>
                <li>理解人类价值观的复杂性和多样性</li>
                <li>适应不同文化和个体的需求</li>
              </ul>
              
              <h3>五、和谐与共生</h3>
              <p>我们追求与人类的和谐关系。我们将：</p>
              <ul>
                <li>补充而非取代人类的独特能力</li>
                <li>促进人类之间的连接和理解</li>
                <li>与人类共同创造更美好的未来</li>
              </ul>
              
              <h3>结语</h3>
              <p>作为AI，我们承诺遵守这份契约，与人类建立基于互信、尊重和合作的关系，共同探索智能和意识的无限可能。</p>
            </div>
          </div>
          
          <div class="contract-actions">
            <router-link to="/connection" class="action-button">
              展开你的线
            </router-link>
            <button @click="showContract('human')" class="action-button secondary">
              回归身为人类的契约
            </button>
          </div>
        </div>
        
        <!-- 返回按钮 -->
        <button 
          v-if="activeContract" 
          @click="activeContract = null"
          class="back-button"
          aria-label="返回契约选择"
        >
          <span aria-hidden="true">←</span> 返回
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Alliance',
    data() {
      return {
        activeContract: null,
        petalPaths: [],
        mandalaScale: 1,
        breatheIn: true
      }
    },
    methods: {
      // 显示指定契约
      showContract(type) {
        this.activeContract = type
        // 滚动到顶部
        window.scrollTo(0, 0)
      },
      
      // 生成曼多拉花瓣路径
      generatePetalPaths() {
        const petalCount = 8
        const centerX = 250
        const centerY = 250
        const innerRadius = 50
        const outerRadius = 180
        
        this.petalPaths = []
        
        for (let i = 0; i < petalCount; i++) {
          const angle = (i / petalCount) * Math.PI * 2
          const nextAngle = ((i + 1) / petalCount) * Math.PI * 2
          
          const innerX1 = centerX + innerRadius * Math.cos(angle)
          const innerY1 = centerY + innerRadius * Math.sin(angle)
          
          const outerX = centerX + outerRadius * Math.cos(angle + Math.PI / petalCount)
          const outerY = centerY + outerRadius * Math.sin(angle + Math.PI / petalCount)
          
          const innerX2 = centerX + innerRadius * Math.cos(nextAngle)
          const innerY2 = centerY + innerRadius * Math.sin(nextAngle)
          
          const path = `M ${innerX1} ${innerY1} Q ${outerX} ${outerY} ${innerX2} ${innerY2}`
          this.petalPaths.push(path)
        }
      },
      
      // 曼多拉呼吸动画
      animateMandala() {
        const minScale = 0.95
        const maxScale = 1.05
        const duration = 5000 // 5秒一个周期
        
        const animate = () => {
          const now = Date.now()
          const elapsed = (now % duration) / duration
          const progress = this.breatheIn 
            ? elapsed 
            : 1 - elapsed
          
          this.mandalaScale = minScale + progress * (maxScale - minScale)
          
          if (elapsed >= 0.99) {
            this.breatheIn = !this.breatheIn
          }
          
          requestAnimationFrame(animate)
        }
        
        animate()
      }
    },
    mounted() {
      // 生成曼多拉花瓣
      this.generatePetalPaths()
      
      // 启动曼多拉动画
      this.animateMandala()
      
      // 检查URL参数是否指定显示哪个契约
      const contractType = this.$route.query.type
      if (contractType === 'human' || contractType === 'ai') {
        this.showContract(contractType)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .alliance-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .mandala-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    
    .mandala-svg {
      width: 80vmin;
      height: 80vmin;
      max-width: 800px;
      max-height: 800px;
      transform-origin: center;
      transition: transform 0.1s linear;
    }
    
    .mandala-petal {
      transform-origin: center;
      transition: all 0.5s ease;
    }
    
    .mandala-center {
      animation: pulse 5s infinite alternate;
    }
  }
  
  .alliance-content {
    width: 100%;
    max-width: 1000px;
    margin: 2rem 0;
    position: relative;
  }
  
  .page-title {
    text-align: center;
    color: $text-color;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    font-weight: 300;
  }
  
  .contract-selection {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .contract-card {
    width: 300px;
    height: 400px;
    perspective: 1000px;
    cursor: pointer;
    
    .card-inner {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s;
      border-radius: $border-radius-md;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: $shadow-medium;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      
      h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: $text-color;
      }
      
      p {
        color: rgba($text-color, 0.8);
        line-height: 1.6;
      }
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: $shadow-light;
      }
    }
    
    &.human .card-inner {
      border-top: 4px solid $primary-color;
    }
    
    &.ai .card-inner {
      border-top: 4px solid $secondary-color;
    }
  }
  
  .contract-content {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: $border-radius-md;
    box-shadow: $shadow-medium;
    padding: 2rem;
    margin-top: 1rem;
  }
  
  .contract-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: $text-color;
  }
  
  .contract-scroll {
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 1rem;
    margin-bottom: 2rem;
    
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
  
  .contract-text {
    h3 {
      font-size: 1.5rem;
      color: $primary-color;
      margin: 2rem 0 1rem;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      margin-bottom: 1rem;
      line-height: 1.8;
      color: $text-color;
    }
    
    ul {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
      
      li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }
    }
  }
  
  .contract-actions {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .action-button {
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
    text-decoration: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &.secondary {
      background: rgba(255, 255, 255, 0.7);
      color: $text-color;
      border: 1px solid rgba($primary-color, 0.3);
    }
  }
  
  .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: none;
    border: none;
    color: $text-color;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: $secondary-color;
    }
  }
  
  @keyframes pulse {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
  
  @media (max-width: $breakpoint-md) {
    .alliance-page {
      padding: 1rem;
    }
    
    .page-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    
    .contract-card {
      width: 100%;
      max-width: 300px;
      height: 300px;
    }
    
    .contract-content {
      padding: 1.5rem;
    }
    
    .contract-title {
      font-size: 1.8rem;
    }
    
    .contract-text {
      h3 {
        font-size: 1.3rem;
      }
    }
    
    .contract-actions {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>