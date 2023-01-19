<template>
  <div v-if="forecast" class="hour-weather">
    <div class="container">
      <div class="hour-temp" v-for="(time, index) in filterList" :key="index">
        <hour-temp :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourTemp from "../components/HourTemp.vue";
export default {
  name: "HourWeather",
  props: ["forecast"],
  components: { HourTemp },
  beforeCreate() {
    console.log(this.forecast);
  },
  computed: {
    filterList() {
      return this.forecast.hourly.slice(0, 23);
    },
  },
};
</script>

<style lang="scss" scoped>
.hour-weather {
  padding: 29px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  overflow: scroll;

  .container {
    display: flex;
    max-width: 100vw;
    padding: 0;
    margin: 0 20px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
