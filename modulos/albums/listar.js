import * as help from "../helpers/";

export const getAlbums = async url => {

    return await help.solicitud(`${url}/albums`);

}