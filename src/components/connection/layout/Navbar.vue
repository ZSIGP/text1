<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        AlignOS
      </router-link>
      
      <div class="navbar-links">
        <router-link to="/" class="nav-link" exact-active-class="active">
          首页
        </router-link>
        <router-link to="/connection" class="nav-link" active-class="active">
          连线
        </router-link>
        <router-link to="/alliance" class="nav-link" active-class="active">
          结盟
        </router-link>
        <router-link to="/resonance" class="nav-link" active-class="active">
          共振
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a6fa5;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
}

.nav-link.active {
  color: #9966cc;
  border-bottom: 2px solid #9966cc;
}
</style>