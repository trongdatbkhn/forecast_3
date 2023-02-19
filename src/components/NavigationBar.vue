<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
      <nav>
        <div>
          <span> Hello, {{ $store.state.user.email }}</span>
        </div>

        <div v-if="$store.state.user">
          <button @click="$store.dispatch('logout')" role="button">
            Sign Out
          </button>
        </div>
        <div class="right">
          <i @click="editCities" class="far fa-edit" ref="editCities"></i>
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
import { useStore } from "vuex";

export default {
  name: "NavigationBar",
  props: ["addCityActive", "isDay", "isNight", "cities", "edit"],
  data() {
    return {
      eCities: [],
    };
  },
  created() {
    const store = useStore();
    store.dispatch("fetchUser");
    return { user: store.state.user };
  },
  mounted() {
    console.log(this.cities.length);
  },
  methods: {
    addCity() {
      this.$emit("add-city");
    },
    reloadPage() {
      location.reload();
    },
    editCities() {
      if (this.cities && this.cities.length > 0) {
        this.$refs.editCities.classList.toggle("edit-active");
        this.$emit("edit-city");
      } else {
        this.$refs.editCities.classList.remove("edit-active");
      }
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
    padding: 22px 0;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        margin: 0px 0px 0px 4px;
      }
      button {
        margin: 0px 54px 0px 0px;
        padding: 4px 6px;
        background-color: #4b87ad;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        text-align: center;
        transition: 200ms;
        width: 100%;
        box-sizing: border-box;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      button:not(:disabled):hover,
      button:not(:disabled):focus {
        outline: 0;
        background: #4b87ad;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2),
          0 3px 8px 0 rgba(0, 0, 0, 0.15);
      }

      button:disabled {
        filter: saturate(0.2) opacity(0.5);
        -webkit-filter: saturate(0.2) opacity(0.5);
        cursor: not-allowed;
      }
    }
  }
  @media (max-width: 440px) {
    nav {
      div {
        span {
          width: 130px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
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
