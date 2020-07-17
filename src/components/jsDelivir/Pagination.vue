<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="barLength"
      v-on:input="$emit('changePage', page)"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["packages"],
  data() {
    return {
      barLength: 0,
      page: 1
    };
  },
  mounted() {
    this.barLength = this.packages.length / 10;
  }
};
</script>

<style scoped>
ul.v-pagination button[aria-current="true"] {
  color: black;
}
</style>
