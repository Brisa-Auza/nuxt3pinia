import { defineStore } from 'pinia';

export const useColorStore = defineStore('color', {
  state: () => ({
    cardColor: '#FFCDD2', // Color inicial por defecto
  }),
  actions: {
    // Cambiar el color y guardarlo en localStorage
    setCardColor(color) {
        console.log(color)
      this.cardColor = color;
      localStorage.setItem('cardColor', color);
    },
    // Cargar el color desde localStorage
    loadCardColor() {
      const savedColor = localStorage.getItem('cardColor');
      if (savedColor) {
        this.cardColor = savedColor;
      }
    },
  },
});
