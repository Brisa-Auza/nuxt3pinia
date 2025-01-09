<template>
    <v-app>
      <v-container class="cajagrande">
        <v-layout row wrap>
          <v-flex xs12>
            <v-row>
              <v-col
                v-for="(actividad, index) in actividad"
                :key="index"
                cols="12"
                md="6"
                sm="6"
              >
              <v-card :style="{ border: `2px solid ${colorStore.cardColor}`}" class="pa-4">
                  <v-card-title>
                    <v-icon :color="colorStore.cardColor" class="mr-2"> mdi-pound </v-icon>
                    Folio 
                    {{ actividad.Folio }}
                  </v-card-title>
                  <v-divider :color="colorStore.cardColor"></v-divider>
                  <v-card-text>
                    <div>
                      {{ actividad.Fecha_Creada }}
                    </div>
                    <div>{{ actividad.Creado_Por }}</div>
                    <div>
                      {{ actividad.Hora_Creada }}
                    </div>
                  </v-card-text>
                  <v-card-text>
                    <h3 >{{ actividad.Descripcion }}</h3>
                  </v-card-text>
                  <v-divider :color="colorStore.cardColor"></v-divider>
                  <v-card-actions style="justify-content: right">
                    <v-icon
                      color="#09bfc5"
                      dark
                      large
                      class="mr-2"
                      @click="agregaruser = true"
                    >
                      mdi-account-multiple-plus-outline
                    </v-icon>
                    <v-icon color="#40c116" dark large class="mr-2"> mdi-wechat </v-icon>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
        <!-- Formulario add area-->
        <template>
          <div class="pa-4 text-center">
            <v-dialog v-model="agregaruser" persistent max-width="600px">
              <v-card style="padding: 15px">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="agregaruser = false">
                    <v-icon style="font-size: 30px"
                      >mdi-close theme--dark red--text</v-icon
                    ></v-btn
                  >
                </v-card-actions>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-form class="mt-5" @submit.prevent="adduser">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-select
                        v-model="formdatos.area"
                        :items="areas"
                        label="¿Qué área quieres aggregar?"
                        filled
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-textarea
                        clear-icon="mdi-close-circle"
                        label="DESCRIBE EL MOTIVO.."
                        clearable
                        style="border: white"
                        v-model="formdatos.descripcion"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <center>
                    <v-btn block outlined color="orange" class="btnEnviar" type="submit"
                      >Actualizar</v-btn
                    >
                  </center>
                </v-form>
              </v-card>
            </v-dialog>
          </div>
        </template>
  
        <v-dialog v-model="alerta" max-width="500">
          <v-card>
            <v-card-title class="text-h4">
              {{ Titulo }}
            </v-card-title>
            <v-card-text class="text-h6 text-center">
              {{ Mensaje }}
            </v-card-text>
            <v-divider></v-divider>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="alerta = false"> Cerrar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  /* Fijoo */
  <script setup>
  import { useColorStore } from '~/stores/colorStore';
  const colorStore = useColorStore();
  definePageMeta({
  layout: "barra",
});
// Definir las variables reactivas
const alerta = ref(false);
const Mensaje = ref("");
const Titulo = ref("");
const actividad = ref([]);
const areas = ref([
  "TECNOLOGÍAS DE LA INFORMACIÓN",
  "SISTEMAS DE GESTIÓN DE LA CALIDAD",
  "AUDITORÍA INTERNA Y ACTOS IRREGULARES",
  "PROCESAMIENTO DE MATERIALES",
  "CONTROL DE INVENTARIOS",
  "SEGURIDAD, SALUD Y MEDIO AMBIENTE",
  "SISTEMA DE RECOLECCIÓN",
  "LOGÍSTICA INTERNA",
  "CAPITAL HUMANO",
  "COMPRAS DE INSUMOS Y SERVICIOS",
  "LOGÍSTICA INTERNACIONAL (EXPORTACIÓN)",
  "CUENTAS EMPRESAS",
  "COMPRAS NO INDUSTRIALES",
  "VENTAS INTERNACIONALES",
  "VENTAS NACIONALES INDUSTRIALES",
  "VENTAS NACIONALES COMERCIALES",
  "PROSPECCIÓN DE COMPRAS EMPRESARIALES",
  "ATENCIÓN A PROVEEDORES",
  "MANTENIMIENTO INDUSTRIAL",
  "CONTABILIDAD",
]);

const formdatos = ref({
  area: "",
  descripcion: "",
});

// Método para obtener los tickets
const mostTickets = async () => {
  try {
    const { data, error } = await useFetch('https://192.168.1.115:3002/Todos_los_Tickets', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      }
    });
    if (error.value) {
      console.error("Error al obtener los datos:", error.value);
    } else {
      console.log(data.value);
      actividad.value = data.value.datos.resultados;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

// Método para agregar un usuario
const adduser = async () => {
  const response = await fetch("http://localhost:3001/ticketrelacion", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdatos.value),
  });

  const datos = await response.json();
  if (response.status === 400) {
    alerta.value = true;
    Titulo.value = "¡Upss!";
    Mensaje.value = datos.mensaje;
  } else {
    alerta.value = true;
    Titulo.value = "Datos actualizados";
    Mensaje.value = " ";
  }
};

onMounted(() => {
  colorStore.loadCardColor();
  mostTickets();
});
  </script>
  
  <style>
  .layout.wrap {
    justify-content: center;
  }
  .v-card__title {
    justify-content: center !important;
    font-size: 30px !important;
  }
  /* .cajas:hover {
      -webkit-transform: rotateY(200deg);
      -webkit-transform-style: preserve-3d;
      transform: rotateY(200deg);
      transform-style: preserve-3d;
    } */
  
  .v-application--wrap {
    background: #000000;
  }
  .cajagrande {
    background: #000000;
  }
  .cajas {
    /* background-color: rgba(0, 16, 50, 0.7); */
    background: #000000 !important;
    border: solid #7021bf 0.5px !important;
  }
  /* TITULOS FOLIOS */
  .theme--dark.v-card {
    color: #ffffff !important;
  }
  .cajastxt {
    text-align: right;
    color: rgb(255, 255, 255);
  }
  .cajasdescrip {
    text-align: center;
    color: rgb(255, 255, 255) !important;
  }
  .iconos {
    background: #7021bf;
    color: #7021bf;
  }
  </style>