<template>
  <main class="login">
    <section class="forms">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <form class="register" @submit.prevent="register">
        <label for="chk" aria-hidden="true">Sign Up</label>
        <input
          type="email"
          placeholder="Email address"
          v-model="register_form.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="register_form.password"
        />
        <!-- <input type="submit" value="Sign Up" /> -->
        <button>Sign Up</button>
      </form>

      <form class="login" @submit.prevent="login">
        <label for="chk" aria-hidden="true">Login</label>
        <input
          type="email"
          placeholder="Email address"
          v-model="login_form.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        <button>Login</button>
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };
    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style scoped>
.login {
  padding: 100px 0;
}
</style>
