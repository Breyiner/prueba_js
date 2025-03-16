import * as help from "../helpers/";

export const getUsuarios = async url => {

    return await help.solicitud(`${url}/users`);

}