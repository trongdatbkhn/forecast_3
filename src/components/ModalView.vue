<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter Location: </label>
      <input
        type="text"
        name="city-name"
        placeholder="Search By City Name"
        v-model="city"
        v-on:keypress="callWeather"
      />
      <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseinit.js";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";

export default {
  name: "ModalView",
  props: ["APIkey", "cities"],
  data() {
    return { city: "" };
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("close-modal");
      }
    },
    async callWeather(e) {
      if (e.key === "Enter") {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city.replace(
            /\s+/g,
            ""
          )}&units=metric&appid=${this.APIkey}`
        );
        const data = await res.data;
        await addDoc(
          collection(
            db,
            "userinformation",
            this.$store.state.user.uid,
            "cities"
          ),
          {
            city: this.city,
            currentWeather: data,
          }
        ).then(() => {
          this.$emit("close-modal");
        });
      }
    },
    async addCity() {
      //   console.log(this.APIkey);
      if (this.city === "") {
        alert("Field cannot be empty");
      } else if (
        this.cities.some((res) => res.city === this.city.toLowerCase())
      ) {
        alert(`${this.city} does exists`);
      } else {
        try {
          // console.log(this.city);
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
          );
          const data = await res.data;
          console.log(data);
          await addDoc(
            collection(
              db,
              "userinformation",
              this.$store.state.user.uid,
              "cities"
            ),
            {
              city: this.city.toLowerCase(),
              currentWeather: data,
            }
          ).then(() => {
            this.$emit("close-modal");
          });
        } catch {
          alert(`${this.city} does not exist, please try again`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 222;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }

  .modal-wrap {
    max-width: 500px;
    border-radius: 10px;
    width: 80%;
    padding: 20px;
    background-color: rgb(64, 64, 64);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.05);

    input {
      color: #fff;
      border: none;
      background-color: rgb(64, 64, 64);
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #282a30;
      color: #fff;
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
