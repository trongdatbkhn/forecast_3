<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap">
        <current-weather
          :isDay="isDay"
          :isNight="isNight"
          :currentWeather="currentWeather"
        />
        <hour-weather :forecast="forecast" />
        <week-weather :forecast="forecast" />
        <additional-info :currentWeather="currentWeather" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "../firebase/firebaseinit.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import CurrentWeather from "../components/CurrentWeather.vue";
import HourWeather from "../components/HourWeather.vue";
import WeekWeather from "../components/WeekWeather.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";
export default {
  name: "WeatherView",
  props: ["APIkey", "isDay", "isNight"],
  components: { CurrentWeather, HourWeather, WeekWeather, AdditionalInfo },
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
      currentTime: null,
    };
  },
  beforeUnmount() {
    this.$emit("resetDays");
  },
  created() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      const q = query(
        collection(db, "userinformation", this.$store.state.user.uid, "cities"),
        where("city", "==", `${this.$route.params.city}`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        this.currentWeather = doc.data().currentWeather;
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${
              doc.data().currentWeather.coord.lat
            }&lon=${
              doc.data().currentWeather.coord.lon
            }&exclude=current,minutely,alerts&units=metric&appid=${this.APIkey}`
          )
          .then((res) => {
            this.forecast = res.data;
          })
          .then(() => {
            this.loading = false;
            console.log(this.forecast);
            console.log(this.currentWeather);
            this.getCurrentTime();
          });
      });
    },
    getCurrentTime() {
      const dataObject = new Date();
      this.currentTime = dataObject.getHours();
      const sunrise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
