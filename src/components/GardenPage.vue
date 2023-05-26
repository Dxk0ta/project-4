<template>
  <div class="garden-page">
    <h1 class="mt-5">Garden Page</h1>
    <div class="row">
      <div v-for="plant in garden" :key="plant.id" class="cardId card mb-3">
        <div class="image-container">
          <router-link :to="`/plant/${plant.id}`">
            <img
              :src="plant.thumbnail"
              alt="Plant thumbnail"
              class="card-img-top"
              @click="viewPlantDetails(plant.id, plant.commonName, plant.thumbnail, plant.cycle, plant.isPoisonous, plant.other_name, plant.watering)"
            />
          </router-link>
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ plant.commonName }}</h2>
          <template v-if="plant.other_name && plant.other_name.length > 0">
            <h4 class="card-text">Other Names: {{ displayOtherNames(plant.other_name) }}</h4>
          </template>
          <h4 class="card-text">Plant Cycle: {{ plant.cycle }}</h4>
          <p v-if="plant.isPoisonous" class="poisonous-message">Caution: Plant is poisonous</p>
          <button @click="deletePlantHandler(plant.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>

    <div class="button-container">
      <router-link to="/plantsearch" class="btn btn-primary">Back to Search</router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['getGarden']),
      hasReminders() {
        return this.plants.some((plant) => plant.watering !== 'None');
      },
      garden() {
        return this.getGarden;
      },
    },
    methods: {
      ...mapActions(['deletePlant']),
      deletePlantHandler(plantId) {
        this.deletePlant(plantId);
      },
      viewPlantDetails(plantId, commonName, thumbnail, cycle, isPoisonous, otherName, watering) {
        this.$router.push({
          name: 'PlantDetails',
          params: { plantId: plantId },
          query: {
            commonName: commonName,
            thumbnail: thumbnail,
            cycle: cycle,
            isPoisonous: isPoisonous,
            other_name: JSON.stringify(otherName),
            watering: watering,
          },
        });
      },
      displayOtherNames(otherNames) {
        return otherNames.join(', ');
      },
    },
  };
</script>

<style scoped>
.garden-page {
  background-color: #e4f4e8;
  padding: 20px;
  font-family: 'Verdana', sans-serif;
}

.cardId {
  flex: 0 0 calc(33.33% - 20px);
  margin-bottom: 20px;
  position: relative;
  box-sizing: border-box;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* Additional styles to make the buttons look similar to PlantDetails.vue */
.btn-primary {
  background-image: linear-gradient(45deg, #0d7377, #18d6ba);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.image-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img-top {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.cardId:hover .card-img-top {
  transform: scale(1.1);
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;
}

.row .cardId {
  margin: 10px;
}

.btn-primary {
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-primary:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.btn-danger {
  background-color: #f44336;
  border-color: #f44336;
}

.btn-danger:hover {
  background-color: #d32f2f;
  border-color: #d32f2f;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .cardId {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 576px) {
  .cardId {
    flex: 0 0 calc(100% - 20px);
  }
}


</style>
