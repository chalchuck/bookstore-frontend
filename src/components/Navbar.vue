<template>
  <nav class="navbar navbar-dark bg-bookstore">
    <a class="navbar-brand" href="/"> BookStore </a>

    <span class="navbar-text">
      {{currentUser.email}}
      <router-link to="/logout" class="btn btn-logout btn-sm">LogOut</router-link>
    </span>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  }
};
</script>

<style lang="scss" scoped>
.bg-bookstore {
  background: #605b56 !important;
}

.btn-logout {
  background-color: #837a75;
  border-color: #837a75;
  color: #fff;
}

.btn-logout:hover {
  background-color: darken(#837a75, 20%);
  border-color: darken(#837a75, 20%);
  color: #fff;
}
</style>
