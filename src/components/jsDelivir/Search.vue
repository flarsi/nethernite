<template>
  <div>
    <v-text-field
      class="mx-4"
      flat
      hide-details
      label="Search"
      solo-inverted
      v-model="search"
      v-on:keyup="SearchMethod"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["packages", "page"],
  data: () => ({
    search: ""
  }),
  methods: {
    SearchMethod() {
      this.packages.map(element => {
        element.show = element.name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
      if (this.search.length === 0) {
        this.packages.map((element, index) => {
          if (index >= (this.page - 1) * 10 && index < this.page * 10) {
            element.show = true;
          } else element.show = false;
        });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
