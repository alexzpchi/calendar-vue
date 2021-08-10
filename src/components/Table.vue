<template>
  <section>
    <table>
      <tr class="header">
        <th v-for="column in header" :key="column">{{column}}</th>
      </tr>
      <tr v-for="(week, i) in data" :key="i">
        <td v-for="(dayOfweek, k) in week" :key="k">
          <day-cell
            :day="dayOfweek"
          />
        </td>
      </tr>
    </table>
  </section>
</template>
<script>

import DayCell from "./DayCell.vue";
export default {
  name: "CalendarTable",
  props: {
    header: {
      type: Array,
    },
    data: {
      type: Object,
    },
  },
  components: {
    DayCell,
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
.header th {
  width: 160px;
}
</style>