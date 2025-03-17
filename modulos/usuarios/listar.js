import * as help from "../helpers/index.js";

export const getUsuarios = async url => {

    return await help.solicitud(`${url}/users`);

}