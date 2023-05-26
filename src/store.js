// vuex/store.js
import { createStore } from "vuex";
import Vue from "vue";

export default createStore({
  state: {
    gardenPlants: [],
    showReminders: false,
    plants: []
  },
  mutations: {
    addToGarden(state, plant) {
      const updatedPlant = { ...plant, reminders: [], watering: plant.watering };
      state.gardenPlants.push(updatedPlant);
    },
    setPlants(state, plants) {
      state.plants = plants;
    },
    setShowReminders(state, value) {
      state.showReminders = value;
    },
    toggleReminderCompletion(state, { plantId, reminderId }) {
      const plant = state.gardenPlants.find((p) => p.id === plantId);
      if (plant) {
        const reminder = plant.reminders.find((r) => r.id === reminderId);
        if (reminder) {
          Vue.set(reminder, "completed", !reminder.completed);
        }
      }
    },
    deletePlant(state, plantId) {
      state.gardenPlants = state.gardenPlants.filter((p) => p.id !== plantId);
    },
  },
  actions: {
    setPlants({ commit }, plants) {
      commit("setPlants", plants);
    },
    addToGarden({ commit, state }, plant) {
      const isDuplicate = state.gardenPlants.some((p) => p.id === plant.id);
      if (!isDuplicate) {
        commit("addToGarden", plant);
      } else {
        console.log("Plant already exists in the garden.");
      }
    },
    toggleReminderCompletion({ commit, state }, { plantId, reminderId }) {
      const plant = state.gardenPlants.find((p) => p.id === plantId);
      if (plant) {
        const reminder = plant.reminders.find((r) => r.id === reminderId);
        if (reminder) {
          commit("toggleReminderCompletion", { plantId, reminderId });
        }
      }
    },
    deletePlant({ commit }, plantId) {
      commit("deletePlant", plantId);
    },
  },
  getters: {
    getPlantById: (state) => (id) => {
      return state.gardenPlants.find((plant) => plant.id === id);
    },
    getGarden: (state) => {
      return state.gardenPlants;
    },
  },
});
