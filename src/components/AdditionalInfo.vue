<template>
  <div v-if="currentWeather" class="additional-info">
    <div>
      <span>Sunrise</span>
      <span>{{
        new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString(
          "en-us",
          {
            timeStyle: "short",
          }
        )
      }}</span>
    </div>
    <div>
      <span>Sunset</span>
      <span>{{
        new Date(this.currentWeather.sys.sunset * 1000).toLocaleString(
          "en-us",
          {
            timeStyle: "short",
          }
        )
      }}</span>
    </div>
    <div>
      <span>Humidity</span>
      <span>{{ this.currentWeather.main.humidity }}</span>
    </div>
    <div>
      <span>Cloud</span>
      <span>{{ this.currentWeather.clouds.all }}%</span>
    </div>
    <div>
      <span>Wind</span>
      <span>{{ Math.round(this.currentWeather.wind.speed) }}mph</span>
    </div>
    <div>
      <span>Pressure</span>
      <span>{{ this.currentWeather.main.pressure }}mph</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfo",
  props: ["currentWeather"],
};
</script>

<style lang="scss" scoped>
.additional-info {
  padding: 32px 20px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    margin-bottom: 22px;
    span:nth-child(1) {
      font-size: 13px;
      margin-bottom: 10px;
    }
    span:nth-child(2) {
      font-weight: 500;
    }
  }
  div:nth-child(5),
  div:nth-child(6) {
    margin-bottom: 0;
  }
}
</style>
