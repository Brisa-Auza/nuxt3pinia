<template>
  <v-app>
    <v-container>
      <v-color-picker
      v-model="colorStore.cardColor"
      elevation="0"
    ></v-color-picker>
      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="updateColor"
        >
          guardar
        </v-btn>
      <!-- Tarjetas -->
      <v-row class="mt-4">
        <v-col cols="12" sm="6" md="4" v-for="n in 3" :key="n">
          <v-card :style="{ border: `2px solid ${colorStore.cardColor}`}" class="pa-4">
            <v-card-title>Tarjeta {{ n }}</v-card-title>
            <v-card-text >
              Este es el contenido de la tarjeta. El color de fondo es dinámico.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useColorStore } from '~/stores/colorStore';
import { onMounted } from 'vue';
definePageMeta({
  layout: "barra",
});
// Lista de colores disponibles
const colors = ['#50F296', '#094036', '#3321A6', '#070A40', '#04D9B2', '#8416F2'];

// Acceder a la store
const colorStore = useColorStore();

// Determina el color del texto según el color de fondo
const textColor = computed(() => (isDarkColor(colorStore.cardColor) ? '#FFFFFF' : '#000000'));

// Comprueba si un color es oscuro (para decidir el color del texto)
function isDarkColor(color) {
  const rgb = hexToRgb(color);
  if (!rgb) return false;
  // Fórmula para determinar el brillo percibido
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
}

// Convierte un color HEX a RGB
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b
  );
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : null;
}

// Cargar el color desde localStorage al montar el componente
onMounted(() => {
  colorStore.loadCardColor();
});


// Actualizar el color al seleccionarlo
function updateColor() {
  console.log(colorStore.cardColor)
  colorStore.setCardColor(colorStore.cardColor);
}
</script>
