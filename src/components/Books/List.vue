<template>
  <div>
    <div class="page-header">
      <div class="float-right">
        <input type="text" name="Search" v-model="search" placeholder="Search ..." class="form-control">
        <h1>Books by {{ author.name }}</h1>
      </div>

      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
import Box from "./Box";

export default {
  name: "List",
  props: ["author"],
  data() {
    return {
      search: "",
      books: []
    };
  },
  created() {
    this.$http
      .get(`/authors/${this.author.id}/books`)
      .then(response => (this.books = response.data))
      .catch(() => {
        alert("Something went very wrong Here!");
      });
  },
  methods: {
    searchMatch(bookTitle) {
      return bookTitle.toLowerCase().match(this.searchRegExp);
    }
  },
  computed: {
    searchRegExp() {
      return new RegExp(`(.*)${this.search}(.*)`);
    }
  },
  components: {
    Box
  }
};
</script>

<style>
</style>
