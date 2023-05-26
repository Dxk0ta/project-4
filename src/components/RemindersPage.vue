<template>
  <div class="reminders-page">
    <h1>Reminders</h1>
    <div v-if="hasGardenPlants" class="plant-list">
      <div v-for="plant in gardenPlants" :key="plant.id" class="plant-item">
        <div class="plant-info">
          <img :src="plant.thumbnail" :alt="plant.commonName" class="plant-thumbnail" />
          <p class="plant-name">{{ plant.commonName }}</p>
          <button class="btn btn-primary" @click="openModal(plant)">View Reminders</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="no-plants-message">Please add plants to your garden so you can get reminders.</p>
    </div>
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-container">
        <div class="modal">
          <ReminderModal :selectedPlant="selectedPlant" @close="closeModal" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ReminderModal from './ReminderModal.vue';

export default {
  components: {
    ReminderModal,
  },
  computed: {
    ...mapGetters(['getGarden']),
    hasGardenPlants() {
      return this.getGarden.length > 0;
    },
    gardenPlants() {
      return this.getGarden;
    },
  },
  data() {
    return {
      showModal: false,
      selectedPlant: null,
    };
  },
  methods: {
    openModal(plant) {
      this.selectedPlant = plant;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPlant = null;
    },
  },
};
</script>

<style scoped>
/* Styles remain the same */
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
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

.btn-primary {
  background-color: #4caf50;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #45a049;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.plant-thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.plant-item {
  margin-bottom: 20px; 
}
</style>
