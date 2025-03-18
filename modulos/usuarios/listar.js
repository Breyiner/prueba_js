import {solicitud} from "../helpers/index.js";

export const getUsuarios = async url => {

    return await solicitud(`${url}/users`);

}