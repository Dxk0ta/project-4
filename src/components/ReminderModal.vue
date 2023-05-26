<template>
  <div class="reminder-modal" v-if="plant">
    <h2>{{ plant.commonName }} Reminders</h2>
    <ul class="reminder-list">
      <li v-for="day in reminderDays" :key="day" class="reminder-item">
        <label :class="{ completed: isReminderCompleted(day) }">
          <input type="checkbox" :id="day" :checked="isReminderCompleted(day)" @change="onReminderCompleted(day)" />
          {{ getReminderMessage(day) }}
        </label>
      </li>
    </ul>
    <div v-if="areAllRemindersCompleted" class="all-reminders-completed">
      Great job, this plant is all taken care of. Come back next week. 🤗
    </div>
    <div v-else-if="reminderDays.length === 0" class="no-reminders">
      No reminders
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" @click="$emit('close')">Close</button>
    </div>
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
      return this.selectedPlant;
    },
    reminderDays() {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const wateringProperty = this.plant.watering;

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
    areAllRemindersCompleted() {
      return this.reminderDays.every(day => this.isReminderCompleted(day));
    },
  },
  methods: {
    getReminderMessage(day) {
      if (this.isReminderCompleted(day)) {
        return "Reminder completed!";
      } else {
        return `Water plant on ${day}s`;
      }
    },
    isReminderCompleted(day) {
      if (this.plant.reminders && this.plant.reminders.length > 0) {
        return this.plant.reminders.includes(day);
      }
      return false;
    },
    onReminderCompleted(day) {
      if (!this.isReminderCompleted(day)) {
        this.plant.reminders = [...this.plant.reminders, day];
      } else {
        this.plant.reminders = this.plant.reminders.filter(item => item !== day);
      }
    },
  },
};
</script>

<style scoped>
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

  .reminder-list {
    list-style: none;
    padding: 0;
  }

  .reminder-item {
    margin-bottom: 10px;
  }

  .completed {
    text-decoration: line-through;
  }

  .all-reminders-completed {
    margin-top: 10px;
    font-style: italic;
  }
  
  .no-reminders {
    margin-top: 10px;
  }

  .modal-footer {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 90%;
    }
  } 

</style>
