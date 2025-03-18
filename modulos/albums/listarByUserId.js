import { solicitud } from "../helpers/index.js";

export const getAlbumsByUserId = async (url, userId) => {

    try {
        if (!url || typeof userId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await solicitud(`${url}/albums?userId=${userId}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener los albums: ${error}`);
    }                
}