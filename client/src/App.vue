<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
export default {
  name: "app",
  created () {
    if (localStorage.eleToken) {
      let decoded = jwtDecode(localStorage.eleToken);
      //存储token到vuex
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }else{
      // console.log(localStorage)
      
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
