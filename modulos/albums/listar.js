import * as help from "../helpers/index.js";

export const getAlbums = async url => {

    return await help.solicitud(`${url}/albums`);

}