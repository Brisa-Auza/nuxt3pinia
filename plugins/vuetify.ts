// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default defineNuxtPlugin((nuxtApp) => {
  const darkTheme = {
    dark: true,
    colors: {
      background: '#121212',
      surface: '#1E1E1E',
      primary: '#BB86FC',
      secondary: '#03DAC6',
      error: '#CF6679',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  };

  const lightTheme = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#F5F5F5',
      primary: '#6200EE',
      secondary: '#03DAC5',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  };

  const vuetify = createVuetify({
    theme: {
      defaultTheme: localStorage.getItem('theme') || 'lightTheme',
      themes: {
        darkTheme,
        lightTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
