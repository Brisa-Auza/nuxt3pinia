<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <h1>probando USUARIO DESDE BRISS: {{ userStore.nombre }}</h1>
        </v-col>

        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>VER TICKETS</v-card-title>
            <v-card class="v-sheet theme--dark">
              <a href="/tickets/vertickets">
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
import { useUserStore } from "~/stores/user";
definePageMeta({
  layout: "barra",
  middleware: 'auth',
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
