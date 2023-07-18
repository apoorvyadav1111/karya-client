<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Questrial");
#app{
  background-color: #e5e8f1;
  background-size: cover;
  font-family: "Questrial";
}
</style>
