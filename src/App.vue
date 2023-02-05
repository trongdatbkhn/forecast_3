<template>
  <div class="main">
    <div v-if="isLoading" class="loading"></div>
    <div class="app">
      <nav v-if="$store.state.user">
        <router-link to="/"></router-link>
        <button @click="$store.dispatch('logout')">Logout</button>
      </nav>
      <modal-view
        v-if="modalOpen"
        v-on:close-modal="toggleModal"
        :APIkey="APIkey"
        :cities="cities"
      />
      <navigation-bar
        v-if="isUsersPathHome"
        v-on:add-city="toggleModal"
        v-on:edit-city="toggleEdit"
        :addCityActive="addCityActive"
        :isDay="isDay"
        :isNight="isNight"
        :cities="cities"
      />
      <router-view
        :isDay="isDay"
        :isNight="isNight"
        :cities="cities"
        :edit="edit"
        :APIkey="APIkey"
        v-on:is-day="dayTime"
        v-on:is-night="nightTime"
        v-on:resetDays="resetDays"
        v-on:add-city="toggleModal"
      />
    </div>
  </div>
</template>

<script>
// import { store } from "./store/index.js";
import { useStore } from "vuex";
import { db } from "./firebase/firebaseinit.js";
import NavigationBar from "./components/NavigationBar.vue";
import ModalView from "./components/ModalView.vue";
import axios from "axios";
// import { useRoute } from "vue-router";
// import { v4 as uuidv4 } from "uuid";

import {
  collection,
  query,
  updateDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export default {
  name: "App",
  components: { NavigationBar, ModalView },
  data() {
    return {
      //339d698f17ac0be62378718a872f23c1
      isDay: null,
      isNight: null,
      APIkey: "339d698f17ac0be62378718a872f23c1",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
      isLoading: true,
    };
  },
  mounted() {
    const store = useStore();
    store.dispatch("fetchUser");
    return { user: store.state.user };
  },
  methods: {
    async getLocation() {
      // On page load
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
              .then(async (res) => {
                const locater = res.data;
                const docRef = await setDoc(
                  doc(
                    db,
                    "userinformation",
                    this.$store.state.user.uid,
                    "cities",
                    this.$store.state.user.uid
                  ),
                  {
                    userId: this.$store.state.user.uid,
                    city: locater.name,
                    currentWeather: locater,
                  }
                );
                console.log("Document written with ID: ", docRef);
              });
          } catch (error) {
            console.log(error);
          }
        }),
          (error) => {
            alert(error);
            if (error.code == error.PERMISSION_DENIED) {
              this.locationFound = false;
            }
          };
      }
    },
    async getCurrentCity() {
      const q = query(
        collection(db, "userinformation", this.$store.state.user.uid, "cities")
      );
      onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length === 0) {
          this.isLoading = false;
        }
        snapshot.docChanges().forEach(async (document) => {
          const cityQuery = document.doc.data().city.replace(/\s+/g, "");

          if (
            document.type === "added" &&
            document.doc.metadata.hasPendingWrites
          ) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=metric&APPID=${this.APIkey}`
              );
              const data = response.data;

              const updateWeather = doc(
                db,
                "userinformation",
                this.$store.state.user.uid,
                "cities",
                document.doc.id
              );
              console.log(data);
              await updateDoc(updateWeather, { currentWeather: data })
                .then(() => {
                  console.log("123ád");
                  this.cities.push(document.doc.data());
                })
                .then(() => {
                  console.log(this.cities[0]);
                });
            } catch (error) {
              console.log(error);
            }
          } else if (
            document.type === "added" &&
            !document.doc.metadata.hasPendingWrites
          ) {
            //
            this.cities.push(document.doc.data());
            this.isLoading = false;
          } else if (document.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== document.doc.data().city
            );
          }
        });
      });
      console.log(this.cities.length);
      console.log(this.cities[0].city);
    },
    // getCurrentWeather() {
    //   axios
    //     .get(
    //       `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //     });
    // },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
      console.log(this.addCityActive);
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },
  computed: {
    // fetchUser() {
    //   const store = useStore();
    //   store.dispatch("fetchUser");
    //   return { user: store.state.user };
    // },
    isUsersPathHome() {
      return this.$route.path !== "/login";
    },
  },
  watch: {
    $route() {
      this.getLocation();
      this.getCurrentCity();
      this.checkRoute();
      console.log(this.$store.state.user);
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif, "Quicksand";
}
.day {
  transition: 600ms eas all;
  background-color: rgb(61, 127, 202);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}
.night {
  transition: 600ms eas all;
  background-color: rgb(23, 47, 117);
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
  // .loading {
  //   @keyframes spin {
  //     to {
  //       transform: rotateZ(360deg);
  //     }
  //   }
  //   display: flex;
  //   height: 100%;
  //   width: 100%;
  //   justify-content: center;
  //   align-items: center;
  //   span {
  //     display: block;
  //     width: 60px;
  //     height: 60px;
  //     margin: 0 auto;
  //     border: 2px solid transparent;
  //     border-top-color: #142a5f;
  //     border-radius: 50%;
  //     animation: spin ease 800ms infinite;
  //   }
  // }
}
</style>
