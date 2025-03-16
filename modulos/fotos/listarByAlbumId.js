import * as help from "../helpers/";

export const getPhotosByAlbumId = async (url, albumId) => {

    try {
        if (!url || typeof albumId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await help.solicitud(`${url}/photos?albumId=${albumId}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener los albums: ${error}`);
    }
}