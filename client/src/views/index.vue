<template>
  <div class="index">
    <HeadNav></HeadNav>
    <Sidebar></Sidebar>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import Sidebar from "./Sidebar";

export default {
  name: "index",
  components: {
    HeadNav,
    Sidebar
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 160px;
  min-width: 600px;
  width: calc(100% - 160px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

