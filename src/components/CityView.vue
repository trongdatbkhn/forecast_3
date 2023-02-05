<template>
  <div @click="linkWeather" class="city">
    <i
      v-if="edit"
      @click="removeCity"
      class="far fa-trash-alt edit"
      ref="edit"
    ></i>
    <span>{{ this.city.city }}</span>
    <span style="font-size: 16px; font-weight: 500">{{
      this.city.currentWeather.weather[0].description
    }}</span>
    <div class="weather">
      <span>{{ Math.round(this.city.currentWeather.main.temp) }}&deg;</span>
      <img
        :src="
          require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)
        "
        alt=""
      />
    </div>
    <div class="video">
      <video
        autoplay
        loop
        muted
        :src="
          require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)
        "
      ></video>
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseinit.js";
import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
export default {
  name: "CityView",
  props: ["city", "edit"],
  created() {
    // console.log(this.city.city);
  },
  data() {
    return {
      id: null,
    };
  },
  methods: {
    async removeCity() {
      const q = query(
        collection(db, "userinformation", this.$store.state.user.uid, "cities"),
        where("city", "==", `${this.city.city}`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        this.id = doc.id;
      });
      await deleteDoc(
        doc(
          db,
          "userinformation",
          this.$store.state.user.uid,
          "cities",
          this.id
        )
      );
    },
    linkWeather(e) {
      if (e.target === this.$refs.edit) {
        //
      } else {
        this.$router.push({
          name: "WeatherView",
          params: { city: this.city.city },
        });
      }
      // this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;

  .edit {
    border-radius: 0px 15px 0 0;
    border: 10px solid rgb(88, 88, 88);
    background-color: rgb(88, 88, 88);
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    cursor: pointer;
  }

  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }
  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;

    span {
      font-size: 40px;
      margin-top: 10px;
    }
    img {
      height: 24px;
      width: auto;
    }
  }
  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    video {
      height: 100%;
      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }
    .bg-overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
