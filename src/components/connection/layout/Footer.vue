<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="copyright">© {{ currentYear }} AlignOS. 保留所有权利。</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  margin-top: 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.copyright {
  color: #666;
  font-size: 0.9rem;
}
</style>