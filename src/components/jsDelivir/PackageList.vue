<template>
  <div class="P-list">
    <v-col cols="10">
      list
      <hr />
      <div id="P-list">
        <div
          class="list-item"
          v-for="(packageItem, index) in packages"
          v-bind:key="index"
          v-show="packageItem.show"
        >
          <list-item v-bind:packageItem="packageItem" />
        </div>
      </div>
      <Pagination v-bind:packages="packages" @changePage="changePage" />
    </v-col>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import ListItem from "./ListItem";
export default {
  name: "PackageList",
  components: { ListItem, Pagination },
  props: ["packages"],
  data() {
    return {
      page: ""
    };
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
      this.packages.map((element, index) => {
        if (index >= (page - 1) * 10 && index < page * 10) {
          element.show = true;
        } else element.show = false;
      });
    }
  },
  mounted() {
    this.page = 1;
    this.changePage(this.page);
  }
};
</script>

<style scoped>
.P-list {
  display: flex;
  justify-content: center;
}
</style>
