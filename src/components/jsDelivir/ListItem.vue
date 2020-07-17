<template>
  <div>
    <v-card @click.stop="showModal = true">
      <v-card-title>{{ packageItem.name }}</v-card-title>
      <v-card-subtitle>{{ packageItem.type }}</v-card-subtitle>
      <v-card-text>hits: {{ packageItem.hits }}</v-card-text>
    </v-card>
    <Modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:packageItem="packageItem"
    >
      <h3 slot="header">custom header</h3>
    </Modal>
  </div>
</template>

<script>
import Modal from "../modal/Modal";
export default {
  name: "ListItem",
  components: { Modal },
  props: ["packageItem"],
  data() {
    return {
      showModal: false
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
