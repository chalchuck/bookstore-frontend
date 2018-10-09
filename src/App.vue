<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  methods: {
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
