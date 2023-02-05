<template>
  <div class="main">
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
        <label for="chk" aria-hidden="true">Sign In</label>
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
        <button>Sign In</button>
      </form>
    </section>
  </div>
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

<style scoped lang="scss">
.forms {
  margin: 200px auto;
  width: 320px;
  height: 400px;
  overflow: hidden;
  background: linear-gradient(to bottom, #3987c9 0%, #e1e5ed 100%);
  box-shadow: 5px 20px 50px rgb(121, 116, 116);
  .register {
    position: relative;
    width: 100%;
    height: 100%;
    label {
      color: #fff;
      font-size: 2.3em;
      justify-content: center;
      display: flex;
      margin: 60px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s ease-in-out;
    }
    input {
      width: 60%;
      height: 32px;
      background: #e0dede;
      justify-content: center;
      display: flex;
      margin: 16px auto;
      padding: 10px;
      border: none;
      outline: none;
      border-radius: 5px;
    }
    button {
      width: 60%;
      height: 38px;
      margin: 10px auto;
      justify-content: center;
      display: block;
      color: #fff;
      background: #3b5c8a;
      font-size: 1em;
      font-weight: bold;
      margin-top: 20px;
      outline: none;
      border: none;
      border-radius: 5px;
      transition: 0.2s ease-in;
      cursor: pointer;
    }
    button:hover {
      background: #2f4c86;
    }
  }
  .login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: 0.8s ease-in-out;
    label {
      color: #fff;
      font-size: 2.3em;
      justify-content: center;
      display: flex;
      margin: 60px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s ease-in-out;
    }
    input {
      width: 60%;
      height: 32px;
      background: #e0dede;
      justify-content: center;
      display: flex;
      margin: 16px auto;
      padding: 10px;
      border: none;
      outline: none;
      border-radius: 5px;
    }
    button {
      width: 60%;
      height: 38px;
      margin: 10px auto;
      justify-content: center;
      display: block;
      color: #fff;
      background: #3b5c8a;
      font-size: 1em;
      font-weight: bold;
      margin-top: 20px;
      outline: none;
      border: none;
      border-radius: 5px;
      transition: 0.2s ease-in;
      cursor: pointer;
    }
    button:hover {
      background: #2f4c86;
    }
  }
  .login label {
    color: #2f3b78;
    transform: scale(0.6);
  }
  #chk {
    display: none;
  }
  #chk:checked ~ .login {
    transform: translateY(-450px);
  }
  #chk:checked ~ .login label {
    transform: scale(1);
  }
  #chk:checked ~ .register label {
    transform: scale(0.6);
  }
}
</style>
