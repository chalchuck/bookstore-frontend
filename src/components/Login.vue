<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please Sign in</h2>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <label for="inputEmail" class="sr-only">Email Address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="tomhardy@venom.marvel" required autofocus>

      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false
    };
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  methods: {
    login() {
      this.$http
        .post("/auth", { user: this.email, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed());
    },

    loginSuccessful(req) {
      if (!req.data.token) {
        this.loginFailed();
        return;
      }

      localStorage.token = req.data.token;
      this.error = false;

      this.$router.replace(this.$route.query.redirect || "/authors");
    },
    loginFailed() {
      this.error = "Login Failed";
      delete localStorage.token;
    },

    updated() {
      if (!localStorage.token && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    },
    created() {
      this.checkCurrentSLogin();
    },
    checkCurrentSLogin() {
      if (localStorage.token) {
        this.$router.replace(this.$route.query.redirect || "/authors");
      }
    }
  }
};
</script>


<style lang='css'>
body {
  background: #605b56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin button {
  cursor: pointer;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
