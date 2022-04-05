<template>
  <div>
    <sort-drop-down />
    <motel-card :newList="allMotelData" />
  </div>


</template>

<script>
import MotelCard from '@/components/MotelCard.vue';
import SortDropDown from '@/components/SortDropDown.vue';
import { mapActions,mapState } from "vuex";

export default {
  name: "main",

  components: {
    MotelCard,
    SortDropDown,
  },
  methods:{
    ...mapActions(['getMotelData'])
  },
  computed:{
    ...mapState(['allMotelData'])
  },
  created(){
    this.getMotelData()
  }
};
</script>
