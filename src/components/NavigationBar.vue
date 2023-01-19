<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
      <nav>
        <span>Add City</span>
        <div class="right">
          <i @click="editCities" ref="editCities" class="far fa-edit"></i>
          <i @click="reloadPage" class="fas fa-sync"></i>
          <i @click="addCity" class="fas fa-plus"></i>
        </div>
      </nav>
    </header>

    <header v-else class="container" :class="{ day: isDay, night: isNight }">
      <nav>
        <router-link class="router-link" :to="{ name: 'AddCity' }">
          <i class="fas fa-plus"></i>
        </router-link>
        <span>
          {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleString("en-us", { month: "short" }) }}
          {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
        </span>
        <span>&deg;C</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: ["addCityActive", "isDay", "isNight", "cities"],
  created() {
    console.log(this.addCityActive, this.isDay, this.cities, this.isNight);
  },
  methods: {
    addCity() {
      this.$emit("add-city");
    },
    reloadPage() {
      location.reload();
    },
    editCities() {
      this.$refs.editCities.classList.toggle("edit-active");
      this.$emit("edit-city");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #4b87ad;
  box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

header {
  z-index: 999;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  nav {
    display: flex;
    color: rgb(255, 255, 255);
    padding: 24px 0;
    justify-content: space-between;
  }
  .edit-active {
    color: rgb(92, 37, 37);
  }
  .router-link {
    color: #fff;
  }
  .right {
    i {
      font-size: 20px;
      cursor: pointer;
    }

    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 18px;
    }

    span {
      font-weight: 600;
    }
  }
}
</style>
