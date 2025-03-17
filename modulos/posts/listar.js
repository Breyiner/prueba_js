import * as help from "../helpers/index.js";

export const getPosts = async url => {

    return await help.solicitud(`${url}/posts`);

}