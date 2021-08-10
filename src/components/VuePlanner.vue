<template>
  <section class="planner-container">
    <div class="date-controls">
      <ion-icon name="chevron-back-outline" size="large" @click="previousMonth"></ion-icon>
      <div>
        <span>{{ currentMonth.toUpperCase() }}</span>
        <span v-if="!isCurrentYear">&nbsp;{{ currentYear }}</span>
      </div>
      <ion-icon name="chevron-forward-outline" size="large" @click="nextMonth"></ion-icon>
    </div>
    <calendar-table :header="days" :data="currentMonthData" />
  </section>
</template>

<script>
import { days } from "../utils/days.js";
import CalendarTable from "./Table.vue";
import {
  green,
  darkyellow, 
  darkred
} from "../utils/colors.js";

export default {
  name: "CalendarPlanner",
  props: {},
  components: {
    CalendarTable,
  },
  data() {
    return {
      days: days,
      currentMonth: this.$moment().format("MMMM"),
      currentYear: this.$moment().format("YYYY"),
      currentMonthData: {},
    };
  },
  created() {
    this.getDaysCollection()

    // for the initialization some events
    this.initializeEvents()
    
  },
  computed: {
    isCurrentYear() {
      return +this.currentYear === +this.$moment().format("YYYY");
    },
  },
  methods: {
    getDaysCollection() {
      this.currentMonthData = {}
      let dayInMS = 86400000
      for(let i = 1; i <= this.currentMonthDaysQantity(this.currentYear, this.currentMonth); i++){
        let weekNumber = this.curentFullDate(i).isoWeek()
        let day = {
          date: this.curentFullDate(i),
          badges: [],
          belongsToCurrentMonth: true
        }
        
        if(this.currentMonthData[`week_${weekNumber}`]){
          this.currentMonthData[`week_${weekNumber}`].push(day)
        } else {
          
          this.currentMonthData[`week_${weekNumber}`] = []
          this.currentMonthData[`week_${weekNumber}`].push(day)
        }
      }
      
      // eslint-disable-next-line
      Object.entries(this.currentMonthData).forEach(([key, value], i)=>{
        if(value.length < 7 && i === 0) {
          let missingDaysOfWeek = this.curentFullDate(this.$moment(value[0].date).get('date')).isoWeekday()
          // eslint-disable-next-line
          for(let k = missingDaysOfWeek - 1; k > 0; k--){
            value.unshift({
              date: this.$moment(this.$moment(value[0].date.valueOf() - dayInMS)),
              badges: [],
              belongsToCurrentMonth: false
            })
          }

        } else if((value.length < 7 && i === Object.entries(this.currentMonthData).length - 1)){
          let missingDaysOfWeek = 7 - this.curentFullDate(this.$moment(value[value.length - 1].date).get('date')).isoWeekday()
          
          for(let k=0; k<missingDaysOfWeek; k++){
            value.push({
              date: this.$moment(this.$moment(value[value.length - 1].date.valueOf() + dayInMS)),
              badges: [],
              belongsToCurrentMonth: false
            })
          }
        }
      })

      
    },
    curentFullDate(dayNumber){
      return this.$moment([+`${this.currentYear}`, +`${this.$moment().month(this.currentMonth).format("M") - 1}`, +`${dayNumber}`])
    },
    currentMonthDaysQantity(year, month){
      return this.$moment(`${year} - ${this.$moment().month(month).format("M")}`, 'YYYY-MM').daysInMonth()
    },
    previousMonth(){
      let previousMonthNumber = this.$moment(this.curentFullDate(1)).subtract(1, 'months').get('month') + 1
      this.currentMonth = this.$moment(previousMonthNumber, 'M').format('MMMM')
      if(previousMonthNumber === 12){
        this.currentYear = this.$moment(this.curentFullDate(1)).subtract(1, 'year').get('year')
      }
      this.getDaysCollection();
    },
    nextMonth(){
      let nextMonthNumber = this.$moment(this.curentFullDate(1)).add(1, 'months').get('month') + 1
      this.currentMonth = this.$moment(nextMonthNumber, 'M').format('MMMM')
       if(nextMonthNumber === 1){
        this.currentYear = this.$moment(this.curentFullDate(1)).add(1, 'year').get('year')
      }
      
      this.getDaysCollection();
    },
    initializeEvents(){
      Object.entries(this.currentMonthData)[1][1][0].badges.push({
        time: '18:00',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        color: darkyellow
      })
      Object.entries(this.currentMonthData)[1][1][0].badges.push({
        time: '19:00',
        text: 'Morbi in nisl ut nibh fermentum condimentum sit amet imperdiet justo.',
        color: darkred
      })
      Object.entries(this.currentMonthData)[5][1][2].badges.push({
        time: '10:30',
        text: 'Fusce non erat id lectus lacinia condimentum',
        color: green
      })
      Object.entries(this.currentMonthData)[5][1][2].badges.push({
        time: '12:00',
        text: 'Vestibulum orci mi, fermentum ac ante non, vestibulum accumsan ipsum.',
        color: darkred
      })
    }
  },
};
</script>

<style scoped>
.planner-container {
}
.date-controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.5em;
  
}
.date-controls > div {
  color: darkblue
}
.date-controls ion-icon {
  cursor: pointer;
}
</style>
