<template>
  <div class="reminder-modal" v-if="plant">
    <h2>{{ plant.commonName }} Reminders</h2>
    <ul>
      <li v-for="day in getReminderDays(plant)" :key="day">
        <span>{{ day }}</span>
        <input type="checkbox" :id="day" @change="onReminderCompleted(day)" />
        <label :for="day">{{ getReminderMessage(day) }}</label>
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
  computed: {
    plant() {
      return { ...this.selectedPlant };
    },
  },
  methods: {
    getReminderDays(plant) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const wateringProperty = plant.watering;

      let numDays;
      if (wateringProperty === 'Frequent') {
        numDays = 4;
      } else if (wateringProperty === 'Average') {
        numDays = 3;
      } else if (wateringProperty === 'Minimum') {
        numDays = 2;
      } else {
        return [];
      }

      return daysOfWeek.slice(0, numDays);
    },
    getReminderMessage(day) {
      return this.plant.reminderCompleted
        ? "Great job, this plant is all taken care of. Come back next week. 🤗"
        : `Water plant on ${day}s`;
    },
    onReminderCompleted(day) {
      console.log(day)
      if (!this.plant.reminderCompleted) {
        this.$emit('reminder-updated', { ...this.plant, reminderCompleted: true });
      }
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
