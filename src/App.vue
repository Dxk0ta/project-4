<template>
  <div id="app">
    <navbar />
    <router-view
      :plants="plants"
      :add-plant-to-garden="addPlantToGarden"
    ></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "./components/Nav-bar.vue";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["gardenPlants"]),
  },
  data() {
    return {
      plants: [],
      gardenPlantsWithReminders: [],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    gardenPlants: {
      immediate: true,
      handler(gardenPlants) {
        if (this.$route.name === "garden") {
          const gardenPlantsWithReminders = gardenPlants.map((plant) => {
            const reminders = this.generateReminders(plant.watering);
            return {
              ...plant,
              reminders: reminders,
            };
          });

          this.gardenPlantsWithReminders = gardenPlantsWithReminders;

          // Update the gardenPlants in the store
          this.setGardenPlants(this.gardenPlantsWithReminders);
        }
      },
    },
  },
  methods: {
    ...mapActions(["addToGarden", "setGardenPlants"]),
    async fetchData() {
      try {
        const response = await fetch(
          `https://perenual.com/api/species-list?key=${process.env.VUE_APP_API_KEY}`
        );
        const data = await response.json();
        this.plants = data.data;
      } catch (error) {
        console.error(error);
      }
    },
    generateReminders(watering) {
      if (watering === "Frequent") {
        return [
          {
            id: "reminder1",
            watering: "Frequent",
            completed: false,
          },
        ];
      } else if (watering === "Average") {
        return [
          {
            id: "reminder2",
            watering: "Average",
            completed: true,
          },
        ];
      } else {
        return [];
      }
    },
    addPlantToGarden(plant) {
      const plantWithWatering = { ...plant, watering: plant.watering };
      this.addToGarden(plantWithWatering);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
