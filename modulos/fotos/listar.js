import * as help from "../helpers/index.js";

export const getPhotos = async url => {

    return await help.solicitud(`${url}/photos`);

}