<template>
  <v-app>
    <v-app-bar app class="app-nav-bar">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/test1.png"
            transition="scale-transition"
            width="150"
            height="64"
            href="/"
          />
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.app-nav-bar {
  background-color: #445afb !important;
}
</style>
