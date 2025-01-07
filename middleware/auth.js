// middleware/auth.js
export default async function ({ redirect, $pinia }) {
    // Usar Pinia para acceder al store
    const userStore = useUserStore();
  
    // Hacer la solicitud a la API para verificar el token
    const res = await fetch('https://steelpro.ddns.net:3002/Extraer_Token', {
      headers: {
        token: localStorage.token,
      },
    });
  
    if (res.status === 403) {
        console.log("ALGO ESTA MAL ");
      // Si el token no es válido, redirigir al login
      return redirect({ name: 'token' });
    } else if (res.status === 404) {
      // Si no se encuentra el recurso, redirigir al inicio
      return redirect({ name: 'index' });
    } else {
      // Si el token es válido, obtener los datos del usuario
      const resp = await res.json();
      console.log("middleware ",resp);
      // Actualizar el estado de los stores con la información del usuario
      userStore.setNombre(resp.Dato.nombre);
      userStore.setArea(resp.Dato.Area);
      userStore.setUsuario(resp.Dato.usuario);
      userStore.setPuesto(resp.Dato.puesto);
      userStore.setFoto(resp.Dato.foto);
    }
  }
  