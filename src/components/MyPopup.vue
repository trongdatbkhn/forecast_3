<template>
  <div class="popup" v-if="this.warning == 'Mist'">
    <div class="popup-inner">
      <h2 style="color: red">WARNING!</h2>
      <span> RAIN IN THE AREA IN THE NEXT 24 HOURS </span>
      <br />
      <button class="popup-close" @click="TogglePopup()">CLose</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyPopup",
  props: ["TogglePopup", "cities", "APIkey"],
  data() {
    return {
      myLocation: [],
      warning: "",
    };
  },
  mounted() {
    this.callApiLocation();
  },
  updated() {
    console.log(
      this.myLocation.data ? this.myLocation.data.weather[0].main : null
    );
    this.warning = this.myLocation.data
      ? this.myLocation.data.weather[0].main
      : null;
  },
  methods: {
    async callApiLocation() {
      let long;
      let lat;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // Fetch weather
          this.locationFound = true;
          long = position.coords.longitude;
          lat = position.coords.latitude;
          try {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${this.APIkey}`
              )
              .then((res) => {
                this.myLocation = res;
                console.log(
                  "Document written with ID: ",
                  this.myLocation.data.name
                );
                return this.myLocation.data;
              });
          } catch (error) {
            console.log(error);
            return error;
          }
        }),
          (error) => {
            alert(error);
            if (error.code == error.PERMISSION_DENIED) {
              this.locationFound = false;
            }
          };
      }
      console.log("Document written with ID: ", this.myLocation);
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: rgb(244, 232, 244);
    box-shadow: 0 4px 6px -1px rgba(103, 102, 102, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.05);
    color: #000000;
    padding: 32px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;

    span {
      font-size: 14px;
    }
    button {
      background-color: #36383e;
      color: #ffffff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      cursor: pointer;
    }
  }
}
</style>
>
