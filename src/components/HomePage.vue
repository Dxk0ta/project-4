<template>
  <div class="home-page">
    <h1 class="mt-5">Home Page</h1>
    <button id="goToSearchBtn" @click="goToPlantSearch" class="btn btn-success mt-4">Let's Get Started!</button>
  </div>
</template>
  
  <script>
  export default {
    methods: {
      goToPlantSearch() {
        this.$router.push('/plantsearch');
      }
    }
  }
  </script>

<style scoped>
.home-page {
  background-color: #e4f4e8;
  padding: 20px;
  text-align: center;
}

.mt-5 {
  margin-top: 1.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-success {
  background-color: #4caf50;
  color: #ffffff;
}

.btn-success:hover {
  background-color: #45a049;
}

/* Additional styles to make the button match to the GardenPage.vue */
.btn-success {
  background-image: linear-gradient(45deg, #0d7377, #18d6ba);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.btn-success:hover {
  transform: translateY(-2px);
}

</style>