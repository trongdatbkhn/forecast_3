<template>
  <div v-if="forecast" class="week-weather">
    <div class="container">
      <div class="daily" v-for="(day, index) in filterList" :key="index">
        <daily-forecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "../components/DailyForecast.vue";
export default {
  name: "WeekWeather",
  props: ["forecast"],
  components: { DailyForecast },
  beforeCreate() {
    // console.log(this.forecast);
  },
  computed: {
    filterList() {
      return this.forecast.daily.slice(1, 8);
    },
  },
};
</script>

<style lang="scss" scoped>
.week-weather {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  .daily {
    margin-bottom: 24px;
  }
  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>
