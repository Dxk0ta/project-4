<template>
    <div class="reminder-modal" v-if="selectedPlant">
      <h2>{{ selectedPlant.commonName }} Reminders</h2>
      <ul>
        <li v-for="reminder in selectedPlant.reminders" :key="reminder.id">
          <span>{{ getReminderText(selectedPlant) }}</span>
          <input
            type="checkbox"
            :id="reminder.id"
            v-model="reminder.completed"
            @change="toggleReminderCompletion(reminder.id)"
          />
          <label :for="reminder.id">{{ reminder.completed ? 'Completed' : 'Incomplete' }}</label>
        </li>
      </ul>
      <button class="btn btn-primary" @click="$emit('close')">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedPlant: {
        type: Object,
        required: true,
      },
    },
    methods: {
      getReminderText(plant) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const wateringProperty = plant.watering;
  
        if (wateringProperty === 'Frequent') {
          return `Water plant on ${getRandomWateringDays(4)}`;
        } else if (wateringProperty === 'Average') {
          return `Water plant on ${getRandomWateringDays(3)}`;
        } else if (wateringProperty === 'Minimum') {
          return `Water plant on ${getRandomWateringDays(2)}`;
        } else if (wateringProperty === 'None') {
          return 'Do not water plant';
        } else {
          return 'Invalid watering property';
        }
  
        function getRandomWateringDays(numDays) {
          const shuffledDays = shuffleArray(daysOfWeek);
          const wateringDays = shuffledDays.slice(0, numDays);
          return wateringDays.map(day => `${day}s`).join(', ');
        }
  
        function shuffleArray(array) {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        }
      },
      toggleReminderCompletion(reminderId) {
    // Find the reminder by its ID in the selectedPlant object
        const reminder = this.selectedPlant.reminders.find(r => r.id === reminderId);

        // Toggle the completion status
        reminder.completed = !reminder.completed;

        // Emit an event
        this.$emit('reminder-updated', this.selectedPlant);
        },
    },
  };
  </script>
  
  
  <style scoped>
  /* Styles remain the same */
  .reminder-modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    max-width: 400px;
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
    background-color: #ffa500;
    color: #ffffff;
  }
  
  .btn-primary:hover {
    background-color: #ff8c00;
  }
  </style>
  