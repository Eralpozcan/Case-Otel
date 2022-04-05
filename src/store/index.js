import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allMotelData:[],

  },
  getters: {},
  mutations: {
    setMotelData(state,payload){
      console.table(JSON.parse(payload))
      state.allMotelData = JSON.parse(payload)
    },
    newMotelData(state,payload){
      state.allMotelData.push(payload)
      localStorage.setItem('motelData',JSON.stringify(state.allMotelData))
    },
    updateMotelRating(state,payload){
      if (payload.quantityRate < 0) {
        if (state.allMotelData[payload.index].rating - Math.abs(payload.quantityRate) >= 1) {
          state.allMotelData[payload.index].rating = Number((state.allMotelData[payload.index].rating - Math.abs(payload.quantityRate)).toFixed(1))
        }
        // }else if (state.allMotelData[payload.index].rating - (Math.abs(payload.quantityRate)/10) >= 0) {
        //   state.allMotelData[payload.index].rating = Number((state.allMotelData[payload.index].rating - Math.abs(payload.quantityRate/10)).toFixed(1))
        // }
      }else {
        if (state.allMotelData[payload.index].rating + payload.quantityRate < 10) {
          state.allMotelData[payload.index].rating = Number(state.allMotelData[payload.index].rating + payload.quantityRate)
        }
        // else if(state.allMotelData[payload.index].rating + (payload.quantityRate/10) <= 10) {
        //   state.allMotelData[payload.index].rating = Number((state.allMotelData[payload.index].rating + (payload.quantityRate/10)).toFixed(1))
        // }
      }
      localStorage.setItem('motelData',JSON.stringify(state.allMotelData))
    },
    deleteMotelData(state,payload){
      state.allMotelData.splice(payload.index,1)
      localStorage.setItem('motelData',JSON.stringify(state.allMotelData))
    }
  },
  actions: {
    getMotelData({commit}){
      if(localStorage.getItem('motelData')){
        commit('setMotelData',localStorage.getItem('motelData'));
      }
    },
    addMotelData({commit},motelData){
      commit('newMotelData',motelData)
    },
    upgradeMotelRating({commit},newData){
      commit('updateMotelRating',newData)
    },
    deleteMotelData({commit},data){
      commit('deleteMotelData',data)
    }
  },
  modules: {},
});
