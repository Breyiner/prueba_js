import * as help from "../helpers/";

export const getPosts = async url => {

    return await help.solicitud(`${url}/posts`);

}