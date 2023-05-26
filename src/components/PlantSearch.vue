<template>
  <div class="plant-search">
    <div class="search-input">
      <input type="text" v-model="searchQuery" placeholder="Search plants" />
      <button @click="search" class="search-button">Search</button>
    </div>
    <div class="plant-list">
      <div v-for="plant in paginatedPlants" :key="plant.id" class="plant-item">
        <img
          :src="plant.default_image.thumbnail"
          class="plant-thumbnail"
          @click="viewPlantDetails(plant.id, plant.common_name, plant.default_image.thumbnail, plant.cycle)"
        />
        <p class="plant-name">{{ plant.common_name }}</p>
      </div>
    </div>
    <div class="btn pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages || paginatedPlants.length === 0">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plants: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchQuery: '',
      pageSize: 5,
      currentPage: 1,
    };
  },
  computed: {
    filteredPlants() {
      if (!this.plants || this.plants.length === 0) {
        return [];
      }
      const query = this.searchQuery.toLowerCase();
      if (query === '') {
        return this.plants;
      }
      return this.plants.filter((plant) => {
        return plant.common_name.toLowerCase().includes(query);
      });
    },
    paginatedPlants() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredPlants.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredPlants.length / this.pageSize);
    },
  },
  methods: {
    search() {
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    viewPlantDetails(plantId, commonName, thumbnail, cycle) {
      const plant = this.plants.find((p) => p.id === plantId);
      if (plant) {
        console.log('conditionallll   ', plant)
        this.$router.push({
          name: 'PlantDetails',
          params: { plantId: plantId },
          query: {
            commonName: commonName,
            thumbnail: thumbnail,
            cycle: cycle,
            isPoisonous: plant.isPoisonous,
            other_name: JSON.stringify(plant.other_name),
            watering: plant.watering
          },
        });
      } else {
        console.log('Plant not found');
      }
    },
  },
};
</script>

<style scoped>
.plant-search {
  margin-top: 20px;
  background-color: #f6f6f6;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.search-input {
  margin-bottom: 10px;
}

.search-input input {
  padding: 8px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
}

.search-input .search-button {
  margin: 0 5px;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 12x;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.plant-list {
  margin-bottom: 10px;
}

.plant-item {
  margin-bottom: 10px;
  text-align: center;
}

.plant-thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.plant-thumbnail:hover {
  transform: scale(1.1);
}

.plant-name {
  font-weight: bold;
  margin-top: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}


.pagination button {
  margin: 0 5px;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-info {
  font-size: 14px;
}

@media (max-width: 576px) {
  .plant-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>