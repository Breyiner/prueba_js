import * as help from "../helpers/index.js";

export const getComments = async url => {

    return await help.solicitud(`${url}/comments`);

}