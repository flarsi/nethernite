<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div>HOME</div>
        <hr />
        <Search v-bind:packages="packages" v-if="packages" v-bind:page="page" />
        <PackageList
          v-bind:packages="packages"
          v-if="packages"
          @changePage="changePage"
        />
        <Loader v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Search from "../components/jsDelivir/Search";
import PackageList from "../components/jsDelivir/PackageList";
import store from "../store/index";
import Loader from "../components/Loader";
export default {
  name: "Home",
  components: { Loader, PackageList, Search },
  data: () => ({
    packages: "",
    page: 1
  }),
  methods: {
    changePage(page) {
      this.page = page;
    }
  },
  mounted() {
    this.packages = store.getters.getPackages;
  }
};
</script>

<style>
@import "styles.scss";
</style>
