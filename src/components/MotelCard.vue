<template>
  <div>
      <v-row class="align-center justify-center">
        <v-col cols="4" class="align-center justify-center mt-5" >
          <v-btn class="motelAddButon mx-1" @click="motelAddRoute()" color="primary" elevation="2" outlined
            ><v-icon>mdi-plus </v-icon></v-btn
          >
          <span class="motel-add-text"> OTEL EKLE </span>
          <v-select
            class="mt-5"
            v-model="selectedPlace"
            :items="selectedValues"
            menu-props="auto"
            label="Sıralama"
            dense
            solo
            prepend-inner-icon="mdi-swap-vertical"
            @change="SortSelect()"
          ></v-select>
          <v-card
            class="mx-auto mb-4"
            elevation="9"
            outlined
            min-height="200"
            min-width="200"
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

            <v-row class="d-flex justify-center mx-auto my-auto">
              <v-col cols="5">
                <v-img
                  class="white--text align-center round-class justify-center"
                  height="100%"
                  width="100%"
                  src="https://picsum.photos/500/500"
                >
                </v-img>
              </v-col>
              <v-col cols="7" class="mx-auto justify-center">
                <div
                  class="font-weight-bold text-xl-h5 text-lg-h6 text-start mx-2"
                >
                  {{ item.motelName }}
                </div>
                <div
                  class="text-xl-h6 text-lg-h7 text-start mx-2"
                  style="color: #0dc5bb"
                >
                  {{ item.rating }} Puan
                </div>

                <v-row class="d-flex justify-center">
                  <v-col class="justify-center">
                    <v-btn
                      class="mx-1 my-1 font-family-class text-center"
                      color="blue"
                      depressed
                      elevation="2"
                      outlined
                      raised
                      @click="MotelPointIncrease(index)"
                    >
                      PUAN ARTIR
                    </v-btn>

                    <v-btn
                      class="mx-1 my-1 font-family-class"
                      color="blue"
                      depressed
                      elevation="2"
                      outlined
                      raised
                      @click="MotelPointDecrease(index)"
                    >
                      PUAN AZALT
                    </v-btn>
                  </v-col>
                </v-row>
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
              <v-btn
                class="close-button-dialog"
                icon
                @click="modalStatus = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-card-title class="text-h5"> Oteli Sil </v-card-title>
              <v-card-text
                >{{ modalData.motelName }}’i silmek istediğinizden emin
                misiniz?</v-card-text
              >
              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  @click="DeleteMotel(modalData.list_index)"
                >
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
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["newList"],
  data() {
    return {
      modalStatus: false,
      page: 1,
      pageSize: 5,
      testList: this.newList,
      listCount: 0,
      historyList: [],
      modalData: [],
      selectedPlace: "",
      selectedValues: ["Puan (Artan)", "Puan (Azalan)"],
      sortSelectArrow: false,
    };
  },
  methods: {
    ChangeIn(index) {
      this.testList[index].setHover = true;
    },
    ChangeOut(index) {
      this.testList[index].setHover = false;
    },
    OpenModal(index) {
      this.modalStatus = true;
      this.modalData = Object.assign({
        ...this.historyList[index],
        list_index: index,
      });
      localStorage.setItem("modalData", JSON.stringify(this.modalData));
    },
    MotelPointIncrease(index) {
      this.$store.dispatch("upgradeMotelRating", {
        index: index,
        quantityRate: Number(1),
      });
    },
    MotelPointDecrease(index) {
      this.$store.dispatch("upgradeMotelRating", {
        index: index,
        quantityRate: Number(-1),
      });
    },
    DeleteMotel(index) {
      this.$store.dispatch("upgradeMotelRating", { index: index });
      this.initPage();
    },
    motelAddRoute(){
      this.$router.push({name:"moteladd"})
    },
    SortSelect() {
      if (this.selectedPlace == "Puan (Artan)"){
        this.testList.sort(function(a, b) {
          return new Date(b.rating) - new Date(a.rating) ;
        });
      }else {
        this.testList.sort(function(a, b) {
          return new Date(a.rating) - new Date(b.rating) ;
        });
      }
      this.initPage()
    },
    createPageSort(){
      if(this.historyList){
        this.testList.sort(function(a, b) {
          return new Date(b.registerDate) - new Date(a.registerDate) ;
        });
        this.initPage()
      }
    },

    initPage() {
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
    this.createPageSort();
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
.font-family-class {
  font-family: "Segoe UI", Tahoma, sans-serif;
}

.modal {
  border-radius: 35px;
}
.motel-add-text {
  font-family: "Segoe UI", Tahoma, sans-serif;
  font-weight: bold;
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
