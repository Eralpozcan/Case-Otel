<template>
  <v-card class="mx-auto my-5" max-width="400" max-height="400">
    <v-card-title>Otel Ekle</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field
            v-model="motelName"
            :rules="nameRules"
            label="Otel Adı"
            required
            placeholder="Otel Adı"
            outlined
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="rating"
            :rules="ratingRules"
            label="Otel Puanı"
            placeholder="Otel Puanı"
            outlined
            required
          ></v-text-field>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row> </v-row>
        <v-row v-if="!registered" class="d-flex justify-center">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="motelRegister()">Ekle</v-btn>
        </v-row>
        <v-row v-else class="d-flex justify-center">
          <v-spacer></v-spacer>
          <v-btn color="success" @click="motelRegister()">Eklendi</v-btn>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    valid: false,
    registered: false,
    motelName: "",
    rating: 0,
    colorProperties: "info",
    nameRules: [
      (v) => !!v || "Otel adı gereklidir",
      (v) => v.length >= 3 || "Otel adı 3 karakterden küçük olamaz",
    ],
    ratingRules: [
      (v) => !!v || "Puan gereklidir",
      (v) => Number(v) >= 0 || "Otel puanı 0 küçük olamaz",
      (v) => Number(v) <= 10 || "Otel puanı 10 dan büyük olamaz",
    ],
  }),
  methods: {
    ...mapActions(['getMotelData']),
    motelRegister() {
      if(this.registered == false){
        this.registered = true;
        var currentDate = new Date();
        var formatted_date = currentDate.toJSON().slice(0, 10).replace(/-/g, "/");
        let motelData = {
          motelName: String(this.motelName),
          rating: Number(this.rating),
          setHover:false,
          registerDate: currentDate,
          registerDate_formated: formatted_date,
        };
        this.$store.dispatch("addMotelData",motelData);
      }
      setTimeout(() => {
        // Sayfayı yeniliyoruz herhangi bir yönlendirmemiz olmadığı için. Tekrar veri girebilmek için
        //this.$router.go(0);
        this.motelName = ''
        this.rating = ''
        this.registered = false
      }, 5000);
    },
  },
  created(){
    this.getMotelData()
  }
};
</script>

<style></style>
