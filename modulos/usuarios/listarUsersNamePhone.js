import * as users from "../usuarios/";

export const getUsersWithNamesAndPhones = async (url) => {
    const usuarios = await users.getUsuarios(url);
    
    // Usamos Promise.all para esperar a que todas las promesas dentro del array se resuelvan
    let respuesta = await Promise.all(
      // Iteramos sobre cada usuario usando map y este nos retornará un arreglo con cada usuario dentro.
      usuarios.map(async usuario => {
        // Devolvemos la propiedad nombre y telefono
        return { 
            nombre: usuario.name, 
            telefono: usuario.phone 
        };
      })
    );

    // Devolvemos el respuesta final que contiene todos los datos combinados
    return respuesta;
}