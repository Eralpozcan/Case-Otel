<template>
  <v-app>
    <v-card
      class="mx-auto my-5 justify-center"
      max-width="500"
      max-height="500"
      elevation="9"
      outlined
      v-for="(item, index) in historyList"
      :key="index"
    >

      <div
        class="close-button-area"
        @mouseenter="ChangeIn(index)"
        @mouseleave="ChangeOut(index)"
      >
        <v-icon
          class="close-button"
          v-show="item.setHover"
          color="red"
          @click="OpenModal(index)"
          >mdi-close-circle</v-icon
        >
      </div>

      <v-row>
        <v-col cols="5">
          <v-img
            class="white--text align-center mx-1 my-1 round-class"
            height="250px"
            width="250px"
            src="https://picsum.photos/400/400"
            rounded-xl
          >
          </v-img>
        </v-col>
        <v-col cols="7">
          <v-card-title>{{ item.motelName }}</v-card-title>
          <v-card-subtitle style="color: #0dc5bb">
            {{ item.rating }} Puan
          </v-card-subtitle>

          <v-card-actions class="align-end">
            <v-btn color="blue" depressed elevation="2" large outlined raised @click="MotelPointIncrease(index)">
              PUAN ARTIR
            </v-btn>

            <v-btn color="blue" depressed elevation="2" large outlined raised @click="MotelPointDecrease(index)">
              PUAN AZALT
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      class="modal"
      v-model="modalStatus"
      persistent
      max-width="300"
      max-height="500"
    >
      <v-card>
        <v-spacer></v-spacer>
        <v-btn class="close-button-dialog" icon @click="modalStatus = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="text-h5"> Oteli Sil </v-card-title>
        <v-card-text
          >{{modalData.motelName}}’i silmek istediğinizden emin misiniz?</v-card-text
        >
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="DeleteMotel(modalData.list_index)">
            Oteli Sil
          </v-btn>
          <v-btn color="primary" outlined @click="modalStatus = false">
            Vazgeç
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-pagination
      class="pagination mb-2"
      v-model="page"
      :length="pages"
      @input="updatePage"
    ></v-pagination>
  </v-app>
</template>

<script>
export default {
  name: "Card",
  props:['newList'],
  data() {
    return {
      modalStatus: false,
      page: 1,
      pageSize: 5,
      testList: this.newList ,
      listCount: 0,
      historyList: [],
      modalData:[],
    };
  },
  methods: {
    ChangeIn(index) {
        this.testList[index].setHover = true
    },
    ChangeOut(index) {
        this.testList[index].setHover = false
    },
    OpenModal(index) {
      this.modalStatus = true;
      this.modalData = Object.assign({...this.historyList[index],list_index:index})
      localStorage.setItem('modalData', JSON.stringify(this.modalData))
    },
    MotelPointIncrease(index){
      this.$store.dispatch('upgradeMotelRating',{index:index,quantityRate:Number(1)})
    },
    MotelPointDecrease(index){
      this.$store.dispatch('upgradeMotelRating',{index:index,quantityRate:Number(-1)})
    },
    DeleteMotel(index){
      this.$store.dispatch('upgradeMotelRating',{index:index})
      this.initPage()
    },
    initPage(){
      this.listCount = this.testList.length;
      if (this.listCount < this.pageSize) {
        this.historyList = this.testList;
      } else {
        this.historyList = this.testList.slice(0, this.pageSize);
      }
    },
    updatePage(pageIndex) {
      let _this = this;
      let _start = (pageIndex - 1) * _this.pageSize;
      let _end = pageIndex * _this.pageSize;
      _this.historyList = _this.testList.slice(_start, _end);
      _this.page = pageIndex;
    },
  },
  created() {
    this.initPage();
    this.updatePage(this.page);
  },
  computed: {
    pages() {
      let _this = this;
      if (_this.pageSize == null || _this.listCount == null) return 0;
      return Math.ceil(_this.listCount / _this.pageSize);
    },
  },
};
</script>

<style>
.modal {
  border-radius: 35px;
}

.close-button {
  position: absolute;
  top: -0.7rem;
  right: -0.4rem;
  font-size: 3rem;
}

.close-button-dialog {
  position: absolute;
  top: 0;
  right: 0;
}

.close-button-area {
  right: 0.1rem;
  width: 1rem;
  height: 1rem;
  position: absolute;
}

.round-class {
  border-radius: 0.3rem;
}
</style>
