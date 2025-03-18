import {solicitud} from "../helpers/index.js";

export const getPosts = async url => {

    return await solicitud(`${url}/posts`);

}