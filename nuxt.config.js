
import { transformAssetUrls } from 'vite-plugin-vuetify'
import path from 'path'
import fs from 'fs'
import vuetify from 'vite-plugin-vuetify'

export default {
  // Configuración del servidor para HTTPS
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'mi_certificado.crt'))
    },
    port: 3001, // El puerto en el que se ejecutará el servidor
  },

  // Deshabilitar la renderización del lado del servidor (SSR)
  ssr: false,

  // Encabezados globales de las páginas
  head: {
    titleTemplate: '%s',
    title: 'Steelpro',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // CSS global
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  buildModules: [
    '@pinia/nuxt',
  ],

  // Plugins para ejecutar antes de renderizar la página
  plugins: [
    // Aquí puedes agregar plugins si es necesario
  ],

  // Auto-importación de componentes
  components: true,

  // Módulos de desarrollo y construcción

  // Módulos adicionales (si los necesitas)
  modules: ['@pinia/nuxt'],

  // Configuración de Vuetify
  /* vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#1976D2', // Ejemplo de color azul
          accent: '#9C27B0',  // Color de acento
          secondary: '#FF5722',
          info: '#26A69A',
          warning: '#FFEB3B',
          error: '#F44336',
          success: '#4CAF50'
        },
        light: {
          primary: '#FF5733',  // Color primario personalizado
          secondary: '#C70039',
          accent: '#900C3F',
        },
      }
    }
  }, */

  // Configuración de Vite para Vuetify
  vite: {
    plugins: [
      vuetify({ autoImport: true }), // Integración de Vuetify
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  router: {
    middleware: ['auth'],  // 'auth' es el middleware que se ejecutará antes de cada navegación
  },

  // Configuración de la fecha de compatibilidad (si la necesitas)
  compatibilityDate: '2024-12-28',
}
