// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        nombre: null,
        Area: null,
        usuario: null,
        puesto: null,
        foto: null,
    }),
    actions: {
        setNombre(text) {
            this.nombre = text;
        },
        setArea(text) {
            this.Area = text;
        },
        setUsuario(text) {
            this.usuario = text;
        },
        setPuesto(text) {
            this.puesto = text;
        },
        setFoto(text) {
            this.foto = text;
        },
    },
});
