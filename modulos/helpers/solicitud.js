// Definimos una función asincrónica llamada "solicitar"
// Esta función recibe un parámetro, url (la URL a la que se hará la solicitud)
export const solicitud = async url => {
    // Hacemos una solicitud a la URL usando fetch y esperamos la respuesta
    const peticion = await fetch(url);
    
    // Convertimos la respuesta en formato JSON y esperamos a que se complete
    const data = await peticion.json();
    
    // Devolvemos los datos obtenidos en formato JSON
    return data;
}