import * as help from "../helpers/";

export const getComments = async url => {

    return await help.solicitud(`${url}/comments`);

}