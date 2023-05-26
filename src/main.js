import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import store from './store';
import PlantSearch from './components/PlantSearch.vue';
import GardenPage from './components/GardenPage.vue';
import HomePage from './components/HomePage.vue';
import PlantDetails from './components/PlantDetails.vue';
import Reminders from './components/RemindersPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/plantsearch',
    name: 'PlantSearch',
    component: PlantSearch,
  },
  {
    path: '/plant/:plantId',
    name: 'PlantDetails',
    component: PlantDetails,
    props: true,
  },
  {
    path: '/gardenpage',
    name: 'GardenPage',
    component: GardenPage,
    
  },
  {
    path: '/reminders',
    name: 'Reminders',
    component: Reminders,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
