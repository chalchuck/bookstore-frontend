<template>
  <div>
    <div class="page-header">
      <div class="float-right">
        <input type="text" name="search" v-model="search" placeholder="Search ..." class="form-control">

        <h1>All Authors</h1>
      </div>
      <div class="row">
        <Box v-for="author in authors" :key="author.id" :author="author" v-show="searchMatch(author.name)">
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import Box from "./Box";

export default {
  name: "List",
  data() {
    return {
      author: "",
      authors: []
    };
  },
  created() {
    this.$http
      .get("/authors")
      .then(response => this.buildAuthorList(response.data))
      .capture(() => {
        error: "Something went wrong during this Request";
      });
  },
  methods: {
    buildAuthorList() {
      this.$http
        .get("/authors")
        .then(response => (this.authors = response.data))
        .capture(() => {
          error: "Something went wrong during this Request";
        });
    },
    buildAuthorList(data) {
      this.authors = data;
    },
    searchMatch(authorName) {
      return authorName.toLowerCase().match(this.searchRegExp);
    },
    computed: {
      searchRegExp() {
        return new RegExp(`(.*)${this.search}(.*)`);
      }
    }
  },
  components: {
    Box
  }
};
</script>

<style>
</style>
