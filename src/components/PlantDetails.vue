<template>
  <div class="plant-details container">
    <h1 class="mt-5">Plant Details</h1>

    <div class="card mt-4">
      <img :src="plant.thumbnail" alt="Plant thumbnail" class="card-img-top" />
      <!-- <h2 class="card-title">{{ plant.commonName }}</h2> -->
      <div class="card-body">
        <h2 class="card-title">{{ plant.commonName }}</h2>
        <template v-if="plant.other_name && plant.other_name.length > 0">
          <h4 class="card-text">
            Other Names: {{ displayOtherNames(plant.other_name) }}
          </h4>
        </template>
        <h4 class="card-text">Plant Cycle: {{ plant.cycle }}</h4>
        <h4 class="card-text">Plant Maintenance: {{ plant.watering }}</h4>
        <p v-if="plant.isPoisonous" class="poisonous-message">
          Caution: Plant is poisonous
        </p>
      </div>
    </div>

    <div class="mt-4">
      <button @click="addToGardenHandler" class="btn btn-primary">
        Add To Garden
      </button>
      <button @click="backToSearch" class="btn btn-primary">
        Back to Search
      </button>
    </div>

    <div v-if="showMessageOverlay" class="message-overlay">
      <div class="message-content">
        <h3>This plant already exists in your garden.</h3>
        <p>Please choose a different plant on the search page.</p>
        <button @click="closeMessageOverlay" class="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import plantSchema from "../../server/models/Plant";
// const mongoose = require("mongoose");
// const { plantDB } = require("../../server/models/Plant.js");
export default {
  data() {
    return {
      plant: {
        commonName: "",
        thumbnail: "",
        cycle: "",
      },
      showMessageOverlay: false,
    };
  },
  mounted() {
    this.plant.other_name = this.$route.query.other_name;
    this.plant.commonName = this.$route.query.commonName;
    this.plant.thumbnail = this.$route.query.thumbnail;
    this.plant.cycle = this.$route.query.cycle;
    this.plant.watering = this.$route.query.watering;
    // console.log('Plant:', this.plant); // Log the plant object to verify its properties
    // console.log('Cycle:', this.plant.cycle); // Log the value of the plant's cycle
  },
  computed: {
    ...mapGetters(["getGarden"]),
    ...mapActions(["addToGarden"]),
  },
  methods: {
    displayOtherNames(names) {
      if (Array.isArray(names)) {
        return names.join(", ");
      } else if (typeof names === "string") {
        // eslint-disable-next-line no-useless-escape
        const formattedNames = names.replace(/[\[\]]/g, "");
        return formattedNames;
      } else {
        return "";
      }
    },
    closeMessageOverlay() {
      this.showMessageOverlay = false;
    },
    addToGardenHandler() {
      console.log("gardenhandler");
      // console.log("plantdb", plantDB);
      // plantDB
      //   .create({
      //     commonName: "spiderman plant",
      //     thumbnail: "",
      //     cycle: "",
      //     other_name: [],
      //     isPoisonous: false,
      //     watering: "",
      //   })
      //   .then(() => {
      //     console.log("Done insertion");
      //   })
      //   .catch();
      const isDuplicate = this.getGarden.some(
        (p) => p.commonName === this.plant.commonName
      );
      if (!isDuplicate) {
        const plant = { ...this.plant };
        plant.id = Math.random().toString(36).substr(2, 9);
        this.$store.dispatch("addToGarden", plant);
        this.$router.push("/gardenpage");
      } else {
        this.showMessageOverlay = true;
        console.log("Plant already exists in the garden.");
      }
    },
    backToSearch() {
      this.$router.push("/plantsearch");
    },
  },
};
</script>

<style scoped>
.plant-details {
  background-color: #e4f4e8;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.message-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  background-image: linear-gradient(45deg, #0d7377, #18d6ba);
}

.btn-secondary {
  background-color: #df5151;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #c42f2f;
}

.plant-thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
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
