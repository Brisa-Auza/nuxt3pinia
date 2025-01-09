<template>
  <v-app>
    <v-app-bar app fixed color="#000000">
      <v-btn icon :to="'/vertickets'"><v-icon :color="colorStore.cardColor" large>mdi-home</v-icon></v-btn>
      <v-spacer style="text-align: center"> </v-spacer>


      <v-menu
      v-model="menu" :close-on-content-click="false" 
    >    
    <v-btn icon dark @click="menu = false">
                                        <v-icon color="red">mdi-close</v-icon>
                                    </v-btn>  
      <template v-slot:activator="{ props }">
        <v-btn icon  v-bind="props">
        <v-icon :color="colorStore.cardColor" large>mdi-palette</v-icon>
      </v-btn>
      </template>

      <v-color-picker
      v-model="colorStore.cardColor"
      elevation="0"
    ></v-color-picker>
    
      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          block
          @click="updateColor"
        >
          guardar
        </v-btn>
    </v-menu>
      
      <v-btn icon @click="toggleTheme">
        <v-icon :color="colorStore.cardColor" large>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-btn icon :to="'/'" >
        <v-icon :color="colorStore.cardColor" large>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card> </v-card>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { useColorStore } from '~/stores/colorStore';
import { ref } from 'vue';
const menu = ref(false);
const colorStore = useColorStore();
onMounted(() => {
  colorStore.loadCardColor();
});
const theme = useTheme();
const currentTheme = theme.global.name;
function updateColor() {
  console.log(colorStore.cardColor)
  colorStore.setCardColor(colorStore.cardColor);
  menu.value = false;
}
function toggleTheme() {
  const newTheme = currentTheme.value === 'lightTheme' ? 'darkTheme' : 'lightTheme';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);

}
</script>
