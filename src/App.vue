<template>
  <div id="app">
    <v-container fluid content="center">
      <router-view v-if="this.$store.state.packages" />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    fetch("https://data.jsdelivr.com/v1/stats/packages")
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.map(element => {
          element.show = true;
        });
        this.$store.dispatch("loadApp", data);
      });
  }
};
</script>
