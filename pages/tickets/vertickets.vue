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
              <v-card class="cajas">
                <v-card-title style="color: white">
                  <v-icon color="#7021bf" class="mr-2"> mdi-pound </v-icon>
                  Folio
                  {{ actividad.Folio }}
                </v-card-title>
                <v-divider class="iconos"></v-divider>
                <v-card-text>
                  <div class="text-subtitle-1 cajastxt">
                    {{ actividad.Fecha_Creada }}
                  </div>
                  <div class="text-subtitle-1 cajastxt">{{ actividad.Creado_Por }}</div>
                  <div class="text-subtitle-1 cajastxt">
                    {{ actividad.Hora_Creada }}
                  </div>
                </v-card-text>
                <v-card-text>
                  <h3 class="cajasdescrip">{{ actividad.Descripcion }}</h3>
                </v-card-text>
                <v-divider class="iconos"></v-divider>
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
<script>
export default {
  layout: "barra",
  data() {
    return {
      alerta: false,
      Mensaje: "",
      Titulo: "",
      actividad: [],
      agregaruser: false,
      areas: [
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
      ],
      formdatos: {
        area: "",
        descripcion: "",
      },
    };
  },
  mounted() {
    this.mostTickets();
  },

  computed: {},
  methods: {
    /* Mostrar Tabla de control */
    async mostTickets() {
      try {
        const res = await fetch("http://localhost:3001/vertickets", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        });
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          console.log(datos);
          this.actividad = datos.respuesta.respuesta;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async adduser() {
      const res = await fetch("http://localhost:3001/ticketrelacion", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formdatos),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
      } else {
        this.alerta = true;
        //this.Titulo = "El ID del activo es: ";
        this.Titulo = "Datos actualizados";
        this.Mensaje = " ";
        this.actiActualizar = false;
      }
    },
  },
};
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
