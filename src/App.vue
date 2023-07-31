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
#app{
  background-color: rgb(36, 36, 36);
  background-size: cover;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}


</style>
