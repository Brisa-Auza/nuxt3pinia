<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <h1>PEOBANDO USUARIO DESDE BRISS: {{ userStore.nombre }}</h1>
        </v-col>

        <v-col cols="12" md="12">
          <v-card :style="{ border: `2px solid ${colorStore.cardColor}`}" class="pa-4">
            <v-card-title>VER TICKETS</v-card-title>
            <v-card class="v-sheet theme--dark">
              <a href="/vertickets">
                <h4 class="modulo">Tikets</h4>
              </a>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useColorStore } from '~/stores/colorStore';
import { useUserStore } from "~/stores/user";
const colorStore = useColorStore();

definePageMeta({
  layout: "barra",
});


onMounted(() => {
  colorStore.loadCardColor();
});

const userStore = useUserStore();
</script>

<style>
.v-application a {
  text-decoration: none !important;
}
.modulo {
  padding: 20px;
  color: white;
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
}
.v-sheet.v-card {
  margin-bottom: 30px;
}

.title {
  position: absolute;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
}
</style>
