<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="alert-icon" @click="toggleReminders">
        <span class="icon">🪴</span>
        <span class="text">Reminders</span>
      </div>
    </div>
    <div class="navbar-right">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/plantsearch" class="navbar-item">Plant Search</router-link>
      <router-link to="/gardenpage" class="navbar-item">Garden</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toggleReminders() {
      this.$router.push({ name: 'Reminders' });
    },
  },
};
</script>

<style scoped>

body {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #4caf50;
  color: #ffffff;
  padding: 20px 20px 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-item {
  font-size: 1.5rem;
  padding: 10px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  margin-right: 10px;
}

.alert-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
}

.alert-icon .icon {
  margin-right: 5px;
}

.alert-icon:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 0;
  }

  .navbar-right {
    margin-top: 10px;
  }
  
  .navbar-item {
    margin-bottom: 10px;
  }
}
</style>
