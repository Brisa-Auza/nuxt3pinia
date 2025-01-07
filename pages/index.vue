<template>
  <v-app
    style="
      background: url('/fondo5.PNG') no-repeat;
      background-size: cover;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-flow: row;
    "
  >
    <div style="position: relative; left: 20%; top: 20%">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Usuario de rey
        </div>

        <v-text-field
          density="compact"
          placeholder="Usuario"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="usuario.username"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Contraseña
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Contraseña"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="usuario.password"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          v-model="enviarL"
        >
          Ingresar
        </v-btn>
        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Copyright © 2025 STEELPRO V3.5.10 - Todos los derechos reservados Aviso de
            privacidad. Términos y condiciones
          </v-card-text>
        </v-card>
      </v-card>
    </div>
  </v-app>
</template>
<script>
import { useAuthStore } from "~/stores/auth";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      logosteel: "/logosteelpro.png",
      show1: false,
      dialog: false,
      msj1: "",
      ok: false,
      carga: false,
      tik: "",
      usuario: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async enviarL() {
      if (
        this.usuario.username == "" ||
        this.usuario.username === null ||
        this.usuario.password == "" ||
        this.usuario.password === null
      ) {
        this.dialog = true;
        this.msj1 = "¡Ouch!";
        this.tik = "Parece que existen campos vacíos, válida la información nuevamente";
        return false;
      } else {
        this.carga = true;
        const res = await fetch("https://steelpro.ddns.net:3002/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.usuario),
        });
        const datos = await res.json();
        if (res.status == 404 || res.status == 400) {
          this.carga = false;
          this.msj1 = "¡Algo salió mal!";
          this.dialog = true;
          this.tik = datos.mensaje;
        } else {
          this.carga = false;
          /* this.$store.commit("auth/saveToken", datos.token);
            localStorage.token = datos.token; */

          // Guardar el token en el store usando Pinia
          console.log(this.authStore);
          this.authStore.saveToken(datos.token);
          // Guardar el token en localStorage
          localStorage.setItem("token", datos.token);

          this.$router.push({ name: "inicio" });
        }
      }
    },
    reset() {
      this.dialog = false;
      this.ok = false;
    },
  },
};
</script>
