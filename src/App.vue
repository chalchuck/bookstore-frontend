<template>
  <div id="app">
    <template v-if="currentUser">
      <Navbar></Navbar>
    </template>

    <div class="container-fluid">
      <router-view></router-view>

      <template v-if="currentUser">
        <Foot></Foot>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";

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
  components: {
    Navbar,
    Foot
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
}
.container-fluid {
  padding-top: 20px;
}
</style>
