<template>
    <div class="search-results">
        <ul>
            <li v-for="song in results">
                {{song.title}}
            </li>
</ul>
    </div>
</template>

<script>
export default {
  name: "search-results",
  computed: {
    results() {
      return this.$store.state.searchResults;
    }
  },
  methods: {}
};
</script>

