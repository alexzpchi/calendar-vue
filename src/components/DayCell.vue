<template>
  <div class="day-cell-container" :style="{ borderColor: colors.borderColor, background: colors.background }">
    <div class="day-number" :style="{ color: colors.color }">
      {{ numberOfDay }}
    </div>
    <badge
      v-for="(event, i) in day.badges"
      :key="i"
      :event="event"
    />
  </div>
</template>
<script>

import {
  grey,
  darkgrey,
  lightgrey,
  green,
  darkviolet,
  black,
  darkyellow, 
  darkred
} from "../utils/colors.js";
import Badge from "./Badge.vue";
export default {
  name: "DayCell",
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  components: {
    Badge,
  },
  data(){
    return {
      badgeColors: {
        green: green,
        darkred: darkred,
        darkyellow: darkyellow
      }
    }
  },
  computed: {
    colors() {
      let day = this.$moment(this.day.date);

      if (this.formatDate(day) === this.formatDate(this.$moment())) {
        return {
          borderColor: grey,
          color: green,
        };
      } else if (day.isBefore(this.$moment()) && (day.day() === 6 || day.day() === 0)) {
        return {
          background: lightgrey,
          borderColor: lightgrey,
          color: darkviolet,
        };
      } else if (day.day() === 6 || day.day() === 0) {
        return {
          borderColor: lightgrey,
          color: darkviolet,
        };
      }
       else if (day.isBefore(this.$moment())) {
        return {
          background: lightgrey,
          borderColor: lightgrey,
          color: darkgrey,
        };
      } else {
        return {
          borderColor: lightgrey,
          color: black,
        };
      }
    },
    numberOfDay() {
      return this.$moment(this.day.date).format("D");
    },
  },
  methods: {
    formatDate(date) {
      return this.$moment(date).format("DD:MM:YY");
    },
  },
};
</script>
<style scoped>
.day-cell-container {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  border: 1px solid;
  padding: 10px;
}
.day-number {
  font-size: 1.5em;
  font-weight: bold;
  text-align: end;
  padding-right: 5px;
  margin-bottom: 10px;
}
</style>