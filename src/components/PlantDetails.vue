<template>
    <div class="plant-details container">
      <h1 class="mt-5">Plant Details</h1>
  
      <div class="card mt-4">
        <img :src="plant.thumbnail" alt="Plant thumbnail" class="card-img-top" />
        <div class="card-body">
          <h2 class="card-title">{{ plant.commonName }}</h2>
          <h4 v-if="plant.cycle" class="card-text">Plant Cycle: {{ plant.cycle }}</h4>
          <!-- Display other plant details here -->
        </div>
      </div>
  
      <div class="mt-4">
        <button @click="addToGardenHandler" class="btn btn-success add-to-garden-btn">Add To Garden</button>
        <button @click="backToSearch" class="btn btn-success back-to-search-btn">Back to Search</button>
      </div>
  
      <div v-if="showMessageOverlay" class="message-overlay">
        <div class="message-content">
          <h3>This plant already exists in your garden.</h3>
          <p>Please choose a different plant on the search page.</p>
          <button @click="closeMessageOverlay" class="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        plant: {
          commonName: '',
          thumbnail: '',
          cycle: ''
          // Add other properties for plant details
        },
        showMessageOverlay: false
      };
    },
    mounted() {
    this.plant.commonName = this.$route.query.commonName;
    this.plant.thumbnail = this.$route.query.thumbnail;
    this.plant.cycle = this.$route.query.cycle;
    console.log('Plant:', this.plant); // Log the plant object to verify its properties
    console.log('Cycle:', this.plant.cycle); // Log the value of the plant's cycle
  },
    computed: {
      ...mapGetters(['getGarden']),
    },
    methods: {
      ...mapActions(['addToGarden']),
      closeMessageOverlay() {
      this.showMessageOverlay = false;
    },
    addToGardenHandler() {
        const isDuplicate = this.getGarden.some(p => p.commonName === this.plant.commonName);
        if (!isDuplicate) {
          const plant = { ...this.plant };
          plant.id = Math.random().toString(36).substr(2, 9); // Generate a unique ID for the plant
          this.addToGarden(plant);
          this.$router.push('/gardenpage');
        } else {
          this.showMessageOverlay = true;
          console.log('Plant already exists in the garden.');
        }
      },
      backToSearch() {
        this.$router.push('/plantsearch');
      },
    },
  };
  </script>
  
  
  
  <style scoped>
  .plant-details {
    background-color: #e4f4e8; /* Light green background color */
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .add-to-garden-btn {
    margin-right: 10px;
  }
  
  .back-to-search-btn {
    margin-left: 10px;
  }
  
  .message-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .message-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  </style>