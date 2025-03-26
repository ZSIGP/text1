<template>
    <div class="not-found-page">
      <div class="not-found-content">
        <h1>404</h1>
        <p>抱歉，您要找的页面不存在</p>
        <router-link to="/" class="home-button">
          返回首页
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  
  .not-found-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba($primary-color, 0.1), rgba($secondary-color, 0.1));
  }
  
  .not-found-content {
    text-align: center;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: $border-radius-md;
    box-shadow: $shadow-medium;
    
    h1 {
      font-size: 6rem;
      color: $primary-color;
      margin-bottom: 1rem;
      font-weight: 300;
    }
    
    p {
      font-size: 1.5rem;
      color: $text-color;
      margin-bottom: 2rem;
    }
  }
  
  .home-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, rgba($primary-color, 0.8), rgba($secondary-color, 0.8));
    color: white;
    border-radius: $border-radius-md;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: $shadow-light;
    }
  }
  </style>