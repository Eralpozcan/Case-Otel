<template>
  <motel-card :newList="allMotelData" />
</template>

<script>
import MotelCard from "@/components/MotelCard.vue";

import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    MotelCard,
  },
  methods: {
    ...mapActions(["getMotelData"]),
  },
  computed: {
    ...mapState(["allMotelData"]),
  },
  created() {
    this.getMotelData();
  },
};
</script>
