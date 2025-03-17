import * as help from "../helpers/index.js";

export const getPostsByUserId = async (url, userId) => {

    try {
        if (!url || typeof userId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await help.solicitud(`${url}/posts?userId=${userId}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener los posts: ${error}`);
    }
}