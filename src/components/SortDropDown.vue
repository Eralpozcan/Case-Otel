<template>
  <v-col cols="2" justify="space-around" class="mx-3 my-3">
      <v-select
        v-model="e1"
        :items="states"
        menu-props="auto"
        label="Sıralama"
        dense
        solo
        prepend-inner-icon ="mdi-swap-vertical"
      ></v-select>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    e1: "Florida",
    states: ["Puan (Artan)", "Puan (Azalan)"],
  }),
};
</script>

<style></style>
