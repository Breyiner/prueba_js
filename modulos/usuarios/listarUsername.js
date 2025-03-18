import {solicitud} from "../helpers/index.js";

export const getUsersByUsername = async (url,username) => {

    return await solicitud(`${url}/users?username=${username}`);

}