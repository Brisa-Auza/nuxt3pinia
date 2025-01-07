<template>
  <v-app
    style="
      background: url('/fondo3.jpg') no-repeat;
      background-size: cover;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-flow: row;
    "
  >
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h4">
          {{ msj1 }}
        </v-card-title>

        <v-card-text class="text-h6 text-center">
          {{ tik }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reset" @keyup.esc="reset"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="carga" width="500">
      <v-card>
        <v-card-text class="text-h6 text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="purple"
          ></v-progress-circular>
          <h3>Cargando por favor espere..</h3>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row
      justify="center"
      align="right"
      cols="6"
      sm="6"
      md="6"
      height="auto"
      class="pa-4 rounded-xl"
      style="position: relative; top: 15%; left: 27%"
    >
      <v-col style="max-width: 40%">
        <!-- <center>
          <v-icon
            style="
              font-size: 100px;
              background: #ffffff;
              border-radius: 50px;
              color: black;
              margin-bottom: -35px;
              z-index: 1;
            "
            >mdi-account
          </v-icon>
        </center> -->
        <center>
          <img
            :width="150"
            :height="150"
            style="margin-bottom: -47px"
            cover
            :src="logosteel"
          />
        </center>
        <v-card style="">
          <v-card-text
            style="
              background: rgba(0, 0, 0, 0.64);
              border-radius: 8px;
              box-shadow: rgba(0, 0, 0, 3) 0px 0px 107px;
            "
          >
            <v-form ref="form">
              <v-text-field
                label="Usuario"
                prepend-icon="mdi-account"
                v-model="usuario.username"
                cols="6"
              >
              </v-text-field>
              <v-text-field
                label="Contraseña"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                prepend-icon="mdi-lock"
                cols="6"
                v-model="usuario.password"
                @keyup.enter="enviarL"
              >
              </v-text-field>
              <v-input> </v-input>
            </v-form>
          </v-card-text>
        </v-card>
        <center>
          <v-btn
            style="
              background-color: rgb(1 15 23);
              color: white;
              margin-top: -15px;
              width: 50%;
            "
            cols="12"
            sm="6"
            md="4"
            @click="enviarL"
          >
            Ingresar
          </v-btn>
        </center>
      </v-col>
    </v-row>

    <v-footer app style="background-color: black; text-align: center; color: white">
      <h5 style="text-align: center">
        Copyright © 2024 STEELPRO V2.0.0 - Todos los derechos reservados Aviso de
        privacidad. Términos y condiciones
      </h5>
    </v-footer>
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
