import * as help from "../helpers/";

export const getPhotos = async url => {

    return await help.solicitud(`${url}/photos`);

}