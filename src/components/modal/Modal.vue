<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h4 v-if="this.packageItem.type === 'gh'">
              GitHub package {{ packageItem.name }}
            </h4>
            <h4 v-if="this.packageItem.type === 'npm'">
              NPM package {{ packageItem.name }}
            </h4>
          </div>
          <div class="modal-body" v-if="packageVersions && packageStats">
            <div>
              <div>Latest version : {{ packageVersions.tags.latest }}</div>
              <div>Rank : {{ packageStats.rank }}</div>
              <div>Total loads : {{ packageStats.total }}</div>
            </div>
            <div class="versions">
              <div>versions :</div>
              <select size="3">
                <option
                  v-for="(version, index) in this.packageVersions.versions"
                  v-bind:key="index"
                  >{{ version }}</option
                >
              </select>
            </div>
          </div>
          <div class="modal-body" v-else><Loader /></div>
          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loader from "../Loader";
export default {
  name: "Modal",
  components: { Loader },
  props: ["packageItem"],
  data() {
    return {
      packageVersions: "",
      packageStats: ""
    };
  },
  mounted() {
    fetch(
      "https://data.jsdelivr.com/v1/package/" +
        this.packageItem.type +
        "/" +
        this.packageItem.name
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.packageVersions = data;
        if (this.packageItem.type === "gh") {
          this.packageVersions.tags.latest = this.packageVersions.versions[0];
        }
      });

    fetch(
      "https://data.jsdelivr.com/v1/package/" +
        this.packageItem.type +
        "/" +
        this.packageItem.name +
        "/stats"
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.packageStats = data;
      });
  }
};
</script>

<style scoped>
.versions {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

select {
  padding: 5px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.modal-body div {
  margin: 0.5rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
