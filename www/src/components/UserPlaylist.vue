<template>
    <div class="user-playlist">
        <ul>
            <li v-for="song in results">
                {{song.title}}
            </li>
</ul>
    </div>
</template>

<script>
export default {
  name: "user-playlist",
  computed: {
    results() {
      return this.$store.state.userPlaylist;
    }
  },
  methods: {}
};
</script>