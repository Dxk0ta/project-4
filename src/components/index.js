import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import PlantSearch from './components/PlantSearch.vue';
import PlantDetails from './components/PlantDetails.vue';
import GardenPage from './components/GardenPage.vue';
import Navbar from './components/Nav-bar.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/plantsearch', component: PlantSearch },
  { path: '/plantdetails/:id', component: PlantDetails },
  { path: '/gardenpage', component: GardenPage },
  { component: Navbar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
