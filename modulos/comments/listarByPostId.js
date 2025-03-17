import * as help from "../helpers/index.js";

export const getCommentsByPostId = async (url, postId) => {

    try {
        if (!url || typeof postId !== "number") {
            throw new Error("Parámetros inválidos");
        }

        const respuesta = await help.solicitud(`${url}/comments?postId=${postId}`);
        return respuesta;
    } catch (error) {
        console.error(`Error al obtener los posts: ${error}`);
    }
}